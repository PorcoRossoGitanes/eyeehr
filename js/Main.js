//----- Method Draw ------
/**
 * シェーマを追加する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function AttachScheme(i_noteItemId, i_url, callback) 
{
    NoteItem.AttachScheme(i_noteItemId, i_url, callback);
}

/**
 * 備考を変更する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function ChangeRemark(i_noteItemId, i_content, callback) 
{
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
        const ENTER = 13; if ( evt.which == ENTER ) { LoadPatient(); return false; }
    });
    function LoadPatient (i_input) 
    {
        var patientId = $('#PatientId').val();
        if(patientId !== '')
        {
            // 作成日時を取得する。
            var yyyyMMdd = Utility.GetCurrentDate(); hhmmss = Utility.GetCurrentTime();

            // 指定の患者の本日のカルテを作成する。
            present = Note.Create(patientId, yyyyMMdd, hhmmss);

            $('#CurrentFilePath').val(present.getCollection());
        }

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
    function LoadNote()
    {
        var filePath = $('#CurrentFilePath').val();
        present.loadXml(filePath);        
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
    function SaveNote() 
    {
        if(present) present.saveXml();
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
