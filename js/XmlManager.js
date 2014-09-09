
///@summary コンストラクタ
function XmlManager() 
{
}

///@summary カルテを保存する。
///@param i_filePath ファイルパス
///@param i_xmlText  XML文字列
XmlManager.SaveNote = function (i_filePath, i_xmlText)
{
    const CGI = './cgi-bin/saveNote.cgi';
    // var i_xmlText = '<note>';

    // $('div#note-main-complainment').children().each(function(){
    //       $(this).find('input').each(function(){
    //          i_xmlText += '<' + $(this).data('tag') + '>';
    //          //i_xmlText += 'aaa';
    //          i_xmlText += $(this).val();
    //          i_xmlText += '</' + $(this).data('tag') + '>';
    //     }); 
    // });

    // i_xmlText += '</note>';

    console.log(i_xmlText);
    $.get(
        CGI,
        {
            filepath : i_filePath,
            xml : i_xmlText
        },
        function(data,textStatus) {
            if(textStatus=='success') {
                // 実行成功時の処理を記述する。
                $('#result').text('SUCCESS');
                //alert(data);
             }
        }
        ,'html'
    );
    // 失敗を検出する。
    if($('#result').text=='')
    {
         $('#result').text('FAILED');
    }        
}