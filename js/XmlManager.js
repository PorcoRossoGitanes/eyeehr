
///@summary コンストラクタ
function XmlManager() 
{
}

///@summary カルテを保存する。
///@param i_filePath ファイルパス
XmlManager.LoadNote = function (i_filePath)
{
    const cgi = './cgi-bin/loadNote.cgi';
    var data = '';
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
                $note = $(data).find('note');
                // TODO XML→HTML読み出し部-----
                $currentNote = $('[name=note]');
                $currentNote.empty();
                $note.children().each(function(){
                    switch($(this)[0].tagName)
                    {
                        case 'NOTEITEMCONTAINERCOMPLAINT' :
                            var containerComplaint = new NoteItemContainerComplaint();
                            $currentNote.append(containerComplaint.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERDISEASE' :
                            var containerDisease = new NoteItemContainerDisease();
                            $currentNote.append(containerDisease.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERMEDICALCHECK' :
                            var containerMedicalCheck = new NoteItemContainerMedicalCheck();
                            $currentNote.append(containerMedicalCheck.getJQueryObject());
                            break; 
                        case 'NOTEITEMCONTAINERPRESCRIPTION' : 
                            var containerPrescription = new NoteItemContainerPrescription();
                            $currentNote.append(containerPrescription.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINEROPERATION' : 
                            var containerOperation = new NoteItemContainerOperation();
                            $currentNote.append(containerOperation.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERMEMO' : 
                            var containerMemo = new NoteItemContainerMemo();
                            $currentNote.append(containerMemo.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERSCHEME' :
                            var containerScheme = new NoteItemContainerScheme();
                            $currentNote.append(containerScheme.getJQueryObject());
                            break;
                        default :
                            break;
                    }
                });
                // TODO XML→HTML読み出し部-----
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