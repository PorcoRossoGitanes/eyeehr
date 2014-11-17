///@summary カルテ
function Note() {
};(function() {

	///@param クラス名
	this._name = 'Note';

    ///@param [保存先]コレクション
    this._collection = '/db/apps/eyeehr/data/note/patient-to-10000/patient-00001/' + Utility.GetCurrentDate() + '/';

    ///@param [保存先]ファイル名
    this._filename =  this._name + Utility.GetCurrentDate() + '.xml';

    ///@param [保存先]URL
    this._url = this._collection + this._filename;

    ///@param カルテ
	$currentNote = $('[name="' + this._name + '"]');

	// カルテを空にする。
	$currentNote.empty();

	// URLをDATA[url]に格納する。
	$currentNote.attr('data-url', this._url);

	// NoteContainerを追加する。
	var containerComplaint = new NoteItemContainerComplaint();
	$currentNote.append(containerComplaint.getJQueryObject());
	var containerDisease = new NoteItemContainerDisease();
	$currentNote.append(containerDisease.getJQueryObject());
	var containerMedicalCheck = new NoteItemContainerMedicalCheck();
	$currentNote.append(containerMedicalCheck.getJQueryObject());
	var containerPrescription = new NoteItemContainerPrescription();
	$currentNote.append(containerPrescription.getJQueryObject());
	var containerOperation = new NoteItemContainerOperation();
	$currentNote.append(containerOperation.getJQueryObject());
	var containerMemo = new NoteItemContainerMemo();
	$currentNote.append(containerMemo.getJQueryObject());
	var containerScheme = new NoteItemContainerScheme();
	$currentNote.append(containerScheme.getJQueryObject());

	// プロトタイプ
	var _proto = Note.prototype;

	/// @summary クラス名を取得する。
	_proto.getName = function() {
	  return this._name;
	};

	/// @summary クラス名を設定する。
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

///@summary カルテ（XMLファイル）を保存する
Note.SaveXml = function ()
{
	// 指定のカルテをXML(<note />)に変換する。
	var xml = ''; $currentNote.each(function(){ xml = Note.HtmlNoteToXml($(this));});

	// 指定のファイルパスにXMLデーターを保存する。
	//console.log($currentNote.data('url'));
	Utility.SaveXml($currentNote.data('url'), xml); 
}

/**
 * カルテ（XMLファイル）を読込む。
 * @method LoadXml
 * @param {String/Object} i_xml XML<Note />
 */
Note.LoadXml = function (i_xml)
{
	// 現在のカルテを空にする。
	$currentNote.empty();

	$note = $(i_xml);
	//console.log($note);

	//console.log($note.children());
	$note.children().each(function(){

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