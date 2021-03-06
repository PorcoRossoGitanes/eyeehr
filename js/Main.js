//----- Method Draw --------------------------------------------------
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
//----- Method Draw --------------------------------------------------

//----- ドキュメントロード時処理 -----------------------------------------
$(function() {

    var present = null;

    // システム設定を読み込む。
    var json = Config.Load();

    // GET値を取得する。------------------------------------------------
    /**
     * @param {Hashtable} GET値
     */
    var get = Utility.GetQueryString();
    // コマンド値・NoteItemIDを取得する。
    var get_patient = get['patient'];//console.log(get_patient);
    var get_date = get['date'];//console.log(get_date);
    var get_time = get['time'];//console.log(get_time);

    // 指定の患者のカルテ情報を取得する。
    if (get_patient && get_date && get_time) {
        present = new Note(get_patient, get_date, get_time, 1); // TODO : 医師情報1固定
    }
    //----------------------------------------------------------------

    // 左サイドメニューを生成する。
    $('#SideMenuLeft').sidr();

    // 左メインメニューを作成し、位置を修正し、表示する。
    $('#MenuLeft').css('left', 0);
    $('#MenuLeft').css('top', 0);
    // 左メインメニューのタブを生成する。
    $('#MenuLeftTab').tabs();

    // 右メインメニューを作成し、位置を修正し、表示する。
    $('#MenuRight').css('left', parseFloat($(window).width()) - parseFloat($('#MenuRight').width()));
    $('#MenuRight').css('top', -parseFloat($('#MenuLeft').css('height')));
    // 右メインメニューのタブを生成する。
    $('#MenuRightTab').tabs();

    // スタンプガジェットを作成する。
    var stampGadget = new StampGadget();

    // 左メニュー・右メニューをスクロールに応じて移動させる。
    $(window).scroll(function() {
        // 上座標をウィンドウの上座標に合わせる。
        var scrollTop = parseInt($(this).scrollTop());
        $('#MenuLeft').css('top', scrollTop);
        $('#MenuRight').css('top', scrollTop - parseFloat($('#MenuLeft').css('height')));
    });

    //----- イベント登録 -----------------------------------------------

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
    $('#LoadPatientId').click(function() {
        LoadPatient($('#PatientId').val());
    });
    /**
     * 患者番号からカルテを表示する。
     * 当日の患者カルテががある場合、ユーザーにカルテを新規作成するか確認し、新規作成、または、最後のカルテを表示する。
     * 当日の患者のカルテがない場合、カルテを新規作成する。
     * @method LoadPatient
     * @param {Number} i_patientId 患者ID
     */
    function LoadPatient(i_patientId) {
        var ret = true;

        // ■患者番号の妥当性を確認する。
        if (ret) {
            ret = Utility.IsInt(i_patientId);
            if (!ret) alert('患者番号は半角数字で入力してください。');
        }

        //■患者データをORCAから取得する。（DBに保存する。）患者名を表示する。
        if (ret && json.Orca.Sync)
        {
            // ORCAからXMLDBに患者データを更新する。
            ret = Patient.LoadXmlFromOrcaToXmlDb(i_patientId);

            if (!ret) alert('ORCAから正常に患者情報を取得できませんでした。')
        }

        if (ret) {
            // ■　XMLDBから患者名を取得する。
            var doc = Patient.GetInfo(i_patientId); 
            var xml = Utility.XmlToStr(doc); 
            var name = $(xml).find('WholeName').text();

            $('#PatientName').val(name);            
        }

        // ■患者の本日のデータを表示する。（存在しなければ、新規作成する。）
        if (ret) {
            // 本日の日付を取得する。
            var today = Utility.GetCurrentDate();
            var time = Utility.GetCurrentTime();

            // 当日のデーターが存在するか確認する。
            var exist = Note.Exist(i_patientId, today);

            var create = !exist;
            if (exist) {
                // カルテを作成するか確認メッセージを表示する。
                // 「はい」の場合はカルテを作成する。「いいえ」の場合は本日の最後のカルテを開く
                create = confirm('本日のカルテが存在します。新規作成しますか。');
            }

            if (create) {
                // カルテが存在しない場合、および、新規作成が選択された場合、指定の患者の本日のカルテを作成する。
                present = new Note(i_patientId, today, time, 1); // TODO : 医師番号
            } else {
                // 本日の最後のカルテを開く
                var result = true;
                var xml = Note.GetNotes(i_patientId);
                if ($(xml).children().length > 0) {
                    $notes = $(xml).children(':first');
                    if ($notes.children().length > 0) {
                        $note = $notes.children(':first');
                        var date = $note.children('Head').children('Date').text();
                        var time = $note.children('Head').children('Time').text();
                        present = new Note(i_patientId, date, time, 1);
                    } else {
                        result = false;
                    }
                } else {
                    result = false;
                }

                if (!result) alert('適切なデーターを取得できませんでした。');
            }

            // ■患者のカルテ一覧を取得し、履歴・付箋・病歴を更新する。
            var result = true;
            var xml = Note.GetNotes(i_patientId);
            $('#History').empty();
            console.log($('#History')[0]);
            if ($(xml).children().length > 0) {
                $notes = $(xml).children(':first');
                $notes.children().each(function() {
                    $head = $(this).children('Head');
                    var date = $head.children('Date').text();
                    var time = $head.children('Time').text();
                    console.log(Note.GetCollectionUrl(i_patientId, date, time) + ' ' + date + ' ' + time);
                    $('#History').append(
                        '<a href="main.php?patient=' + i_patientId + '&date=' + date + '&time=' + time + '" target="_blank">' +
                        '<div class="Index IndexDate">' + date + ' ' + time + '</div>' +
                        '</a>'
                    );
                });
            } else {
                result = false;
            }
            if (!result) alert('適切なデーターを取得できませんでした。');
        }

        // 現行のコレクションパスを更新する。
        if (present) $('#CurrentFilePath').val(present.getCollection());
    }

    /**
     * @event 「詳細」ボタンを押下時、患者情報を読み込む。
     */
    $('#LoadPatientInfo').click(function() {
        var patientId = $('#PatientId').val();
        const URL = 'patient.php';
        var url = URL + '?patient=' + patientId;
        var name = URL + (new Date().getTime());
        window.open(url, name/*, 'width=' + 400 + ',height=' + 300*/);
    });

    /**
     * @event 「読込」メニューを選択時、カルテを読込む。
     */
    $('#LoadNote').click(function() {
        LoadNote();
    });
    /**
     * カルテを読込む。
     * @method LoadNote
     */
    function LoadNote() {
        present.loadXml(present._patient, present._date, present._time);
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

        if (present) {
            // カルテを保存する。
            present.saveXml();
            // 現在のカルテファイルパスを表示する。
            $('#CurrentFilePath').val(present.getCollection());
        }
    }

    /**
     * @event [開発]カルテHTMLを押下時、カルテHTMLをログ表示する。
     */
    $('#DebutNoteHTML').click(function() {
        $jquery = $('[name="' + Note.ClassName + '"]');
        console.log($jquery[0]);
    });

    /**
     * @event「患者情報」ボタンを押下時、患者情報を表示する。
     */
    $('button#patient-info').click(function() {
        alert('患者情報表示');
    });
    
    // // keyCode F1=112
    // // http://faq.creasus.net/04/0131/CharCode.html
    // // 通常キー　e.keyCode, e.which
    // // Ctrl e.ctrlKey Cmd e.metaKey
    // // Shift e.shiftKey
    // $(document).keydown(function(e){
    //     console.log(e.keyCode + ',' + e.which + ',' + e.ctrlKey + ',' + e.shiftKey + ',' + e.metaKey);
    // });
    // var code = 13; //# Enterキー
    // $(document).trigger(
    //     jQuery.Event( 'keydown', { keyCode: code, which: code } )
    // );
    //----- イベント登録 -----------------------------------------------
});
//----- ロード時、処理 -------------------------------------------------
