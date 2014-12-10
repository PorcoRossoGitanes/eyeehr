//----- Method Draw ------
/**
 * シェーマを追加する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function AttachScheme(i_noteItemId, i_url, callback) {
    NoteItem.AttachScheme(i_noteItemId, i_url, callback);
}

/**
 * 備考を変更する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function ChangeRemark(i_noteItemId, i_content, callback) {
        NoteItem.ChangeRemark(i_noteItemId, i_content, callback);
    }
    //----- Method Draw ------

//----- ドキュメントロード時処理 -----------------------------------------------------
$(function() {

    var present = null;

    // 左サイドメニューを生成する。
    $('#SideMenuLeft').sidr();

    // スタンプガジェットを作成する。
    var stampGadget = new StampGadget();

    // 左メインメニュー・右メインメニューを生成し、表示する。
    $('#MenuLeft').css('left', 0);
    $('#MenuLeft').css('top', 0);
    $('#MenuRight').css('left', parseFloat($(window).width()) - parseFloat($('#MenuRight').width()));
    $('#MenuRight').css('top', -parseFloat($('#MenuLeft').css('height')));

    $(window).scroll(function() {

        var scrollTop = parseInt($(this).scrollTop());

        $('#MenuLeft').css('top', scrollTop);
        $('#MenuRight').css('top', scrollTop - parseFloat($('#MenuLeft').css('height')));

        $('#MenuLeft').animate({
            top: scrollTop
        }, {
            duration: 800,
            queue: false,
            easing: "easeOutCubic",
        });
    });

    $('#tab').tabs();

    //----- イベント登録 -----
    /**
     * @event 患者IDが入力され、RETURN(ENTER)キーが押下された時、患者の本日のカルテを表示する。
     */
    $('#PatientId').keypress(function(evt) {
        const ENTER = 13;
        if (evt.which == ENTER) {
            LoadPatient($(this).val());
            return false;
        }
    });

    function LoadPatient(i_patientId) {
        var ret = true;

        // ■患者番号の妥当性を確認する。
        if (ret) {
            ret = Utility.IsInt(i_patientId);
            if (!ret) {
                alert('患者番号は半角数字で入力してください。')
            }
        }

        if (ret) {
            // 本日の日付を取得する。
            var today = Utility.GetCurrentDate();
            hhmmss = Utility.GetCurrentTime();
            // 当日のデーターが存在するか確認する。
            var exist = Note.Exist(i_patientId, today);
            var create = !exist;
            if (exist) {
                // カルテを作成するか確認メッセージを表示する。
                // 「はい」の場合はカルテを作成する。「いいえ」の場合は本日の最後のカルテを開く
                create = confirm('本日のカルテが存在します。新規作成しますか。');
            }
            if (create) {
                // 指定の患者の本日のカルテを作成する。
                present = Note.Create(i_patientId, today, hhmmss);
            } else {
                // 本日の最後のカルテを開く
            }

        }
        if (ret) {

        }

        $('#CurrentFilePath').val(present.getCollection());
    }


    /**
     * @event 「読込」を選択時、カルテを読込む。
     */
    $('#LoadNote').click(function() {
        LoadNote();
    });
    /**
     * カルテを読込む。
     * @method LoadNote
     */
    function LoadNote() {
        //var filePath = $('#CurrentFilePath').val();
        present.loadXml(present._patientId, present._yyyyMMdd, present._hhmmss);
    }

    /**
     * @event 「保存」を選択時、カルテを保存する。
     */
    $('#SaveNote').click(function() {
        SaveNote();
    });
    /**
     * カルテを保存する。
     * @method SaveNote
     */
    function SaveNote() {
        if (present) present.saveXml();
        // TODO : 現在のカルテファイルパスを表示する。
        $('#CurrentFilePath').val(present.getCollection());
    }

    /**
     * @event「患者情報」ボタンを押下時、患者情報を表示する。
     */
    $('button#patient-info').click(function() {
        alert('患者情報表示');
    });
    //----- イベント登録 -----


});
//----- ロード時、処理 -----
