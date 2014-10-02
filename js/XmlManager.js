
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
            method : 'loadNote',
            filepath : i_filePath //i_filePath
            // ,
            // xml : i_xmlText
        },
        function(data,textStatus) {

            if(textStatus=='success') {

                // 現在のカルテ表示をクリアする。
                $currentNote = $('[name=note]');
                $currentNote.empty();

                // 実行成功時の処理を記述する。
                $('#result-XmlManager_LoadNote').text('SUCCESS');
                
                alert(data);
                console.log($(data));
                //alert('SUCCESS');
                $note = $(data).find('note');
                
                // TODO XML→HTML読み出し部-----

                $note.children().each(function(){
                    //console.log($(this));
                    switch($(this)[0].tagName)
                    {
                        case 'NOTEITEMCONTAINERCOMPLAINT' : 
                            // コンテナを追加し、カルテにコンテナを貼付ける。
                            var containerComplaint = new NoteItemContainerComplaint($(this));
                            $currentNote.append(containerComplaint.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERDISEASE' : // 病名 
                            var containerDisease = new NoteItemContainerDisease();
                            $currentNote.append(containerDisease.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERMEDICALCHECK' :　// 検査
                            var containerMedicalCheck = new NoteItemContainerMedicalCheck();
                            $currentNote.append(containerMedicalCheck.getJQueryObject());
                            break; 
                        case 'NOTEITEMCONTAINERPRESCRIPTION' :  // 処方
                            var containerPrescription = new NoteItemContainerPrescription();
                            $currentNote.append(containerPrescription.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINEROPERATION' :     // 手術
                            var containerOperation = new NoteItemContainerOperation();
                            $currentNote.append(containerOperation.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERMEMO' : // メモ
                            var containerMemo = new NoteItemContainerMemo($(this));
                            $currentNote.append(containerMemo.getJQueryObject());
                            break;
                        case 'NOTEITEMCONTAINERSCHEME' :　// シェーマ
                            var containerScheme = new NoteItemContainerScheme();
                            $currentNote.append(containerScheme.getJQueryObject());
                            $(this).children().each(function(){                                
                                // TODO : コーディング未済
                            });
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

    $.post(
        cgi,
        {
            filepath : i_filePath,
            xml : i_xmlText
        },
        function(data,textStatus) {
            if(textStatus=='success') {
                // 実行成功時の処理を記述する。
                if (data == 'ERROR')
                {
                    alert('保存に失敗しました。');
                    //$('#result-XmlManager_SaveNote').text('失敗');
                }
             }
        }
        ,'html'
    );

    // 失敗を検出する。
    // if($('#result-XmlManager_SaveNote').text == 'ERROR')
    // {   
    //     //$('#result-XmlManager_SaveNote').text('FAILED');
    // }        
}