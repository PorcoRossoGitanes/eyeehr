
///@summary コンストラクタ
function XmlManager() 
{
}

///@summary カルテを保存する。
///@param i_filePath ファイルパス
XmlManager.LoadNote = function (i_filePath)
{
    const cgi = './cgi-bin/loadNote.cgi';

    //alert(i_xmlText);
    $.get(
        cgi,
        {
            filepath : i_filePath //i_filePath
            // ,
            // xml : i_xmlText
        },
        function(data,textStatus) {
            if(textStatus=='success') {
                // 実行成功時の処理を記述する。
                $('#result-XmlManager_LoadNote').text('SUCCESS');
                //alert('SUCCESS');
                console.log($(data).find('note'));
                return data;
             }
        }
        ,'html'
    );

    // 失敗を検出する。
    if($('#result-XmlManager_LoadNote').text=='')
    {
         $('#result-XmlManager_LoadNote').text('FAILED');
    }        
}

///@summary カルテを保存する。
///@param i_filePath ファイルパス
///@param i_xmlText  XML文字列
XmlManager.SaveNote = function (i_filePath, i_xmlText)
{
    const cgi = './cgi-bin/saveNote.cgi';

    alert(i_xmlText);
    $.get(
        cgi,
        {
            filepath : i_filePath,
            xml : i_xmlText
        },
        function(data,textStatus) {
            if(textStatus=='success') {
                // 実行成功時の処理を記述する。
                $('#result-XmlManager_SaveNote').text('SUCCESS');
                //alert('SUCCESS');
                //alert(data);
             }
        }
        ,'html'
    );

    // 失敗を検出する。
    if($('#result-XmlManager_SaveNote').text =='')
    {
         $('#result-XmlManager_SaveNote').text('FAILED');
    }        
}