var present = null;

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

    var stampGadget = new StampGadget();

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


    //----- イベント登録 -----
    /**
     * 患者の本日のカルテを表示する。
     * @event 患者IDが入力され、RETURN(ENTER)キーが押下された時
     */
    $('#PatientId').keypress(function(evt) {
        const ENTER = 13; if ( evt.which == ENTER ) { LoadPatient(); return false; }
    });
    function LoadPatient (i_input) 
    {
        var patientId = $('#PatientId').val();
        if(patientId !== '')
        {
            present = Note.Create(patientId);
            $('#CurrentFilePath').val(present.getCollection());
        }

    }

    /// @summary 「読込」ボタンを押下時、XMLを読込む。
    $('button#load').click(function() {
        var filePath = $('#CurrentFilePath').val();
        present.loadXml(filePath);
    });

    /// @summary 「保存」ボタンを押下時、XMLを保存する。
    $('button#save').click(function() {
        // カルテを保存する。
        if(present) present.saveXml();
        // TODO : 現在のカルテファイルパスを表示する。
        $('#CurrentFilePath').val(present.getCollection());
    });

    // @summary 「患者情報」ボタンを押下時、患者情報を表示する。
    $('button#patient-info').click(function() {
        alert('患者情報表示');
    });
    //----- イベント登録 -----


});
//----- ロード時、処理 -----
