///@summary カルテ
function Note() {
};(function() {

  // プロトタイプ
  var _proto = Note.prototype;
  // メンバメソッド

  _proto.getName = function() {
      return this._name;
  };

  _proto.setName = function(name) {
      this._name = name;
  };
})();

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
Note.HtmlNoteToXml = function($i_jquery)/* $('#note')*/
{
	var retVal = '';
	var tag = $i_jquery.attr('name');

	retVal += '<' + tag + ' id="' + $i_jquery.attr('id') + '">';

	//TODO :  ヘッダー情報を保存する。
	$i_jquery.children('div.NoteItemContainer').each(function () {
		retVal += NoteItemContainer.HtmlToXml($(this));
	})

	retVal += '</' + tag + '>';

	return retVal;
}

///@summary XMLファイルを読込む
///@param $i_xml XML（JQuery Object） <note />
Note.LoadXml = function ($i_xml)
{
	// 現在のカルテを空にする。
	$currentNote = $('[name=note]');
	$currentNote.empty();

	$note = $i_xml.find('note');
	//console.log($note);

	$note.children().each(function(){

	    //console.log($(this));
	   	//console.log($(this)[0].tagName);

	    switch($(this)[0].tagName)
	    {
	        case 'NoteItemContainerComplaint' : 
	            // コンテナを追加し、カルテにコンテナを貼付ける。
	            var containerComplaint = new NoteItemContainerComplaint($(this));
	            $currentNote.append(containerComplaint.getJQueryObject());
	            //console.log(containerComplaint.getJQueryObject());
	            break;
	        case 'NoteItemContainerDisease' : // 病名 
	            var containerDisease = new NoteItemContainerDisease($(this));
	            $currentNote.append(containerDisease.getJQueryObject());
	            // console.log($(this));
	            // console.log(containerDisease.getJQueryObject());
	            break;
	        case 'NoteItemContainerMedicalCheck' :　// 検査
	            var containerMedicalCheck = new NoteItemContainerMedicalCheck($(this));
	            $currentNote.append(containerMedicalCheck.getJQueryObject());
	            break; 
	        case 'NoteItemContainerPrescription' :  // 処方
	            var containerPrescription = new NoteItemContainerPrescription($(this));
	            $currentNote.append(containerPrescription.getJQueryObject());
	            break;
	        case 'NoteItemContainerOperation' :     // 手術
	            var containerOperation = new NoteItemContainerOperation($(this));
	            $currentNote.append(containerOperation.getJQueryObject());
	            break;
	        case 'NoteItemContainerMemo' : // メモ
	            var containerMemo = new NoteItemContainerMemo($(this));
	            $currentNote.append(containerMemo.getJQueryObject());
	            break;
	        case 'NoteItemContainerScheme' :　// シェーマ
	            var containerScheme = new NoteItemContainerScheme($(this));
	            $currentNote.append(containerScheme.getJQueryObject());
	            // $(this).children().each(function(){                                
	            //     // TODO : コーディング未済
	            // });
	            break;
	        default :
	            break;
	    }
	});
}