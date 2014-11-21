/**
 * カルテノート
 * @class Note 
 */
function Note() {

	/**
	 * @param {String} クラス名
	 */
	this._name = 'Note';

    /**
     * @param {String} [保存先]コレクション
     */
    this._collection = '/db/apps/eyeehr/data/note/patient-to-10000/patient-00001/' + Utility.GetCurrentDate() + '/';

    /**
     * @param {String} [保存先]ファイル名
     */
    this._filename =  this._name + Utility.GetCurrentDate() + '.xml';

    /**
     * @param {String}[保存先]URL
     */
    this._url = this._collection + this._filename;

    /** 
     * @param {JQuery Object}カルテ
     */
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
	// var containerScheme = new NoteItemContainerScheme();
	// $currentNote.append(containerScheme.getJQueryObject());
	
};(function() {

	// プロトタイプ
	var _proto = Note.prototype;

	/// @summary クラス名を取得する。
	_proto.getName = function() {
	  return this._name;
	};
})();

/**
 * HTMLをXMLに保存する。
 * @method HtmlNoteToXml
 * @param  {JQuery Object} $i_jquery HTML（入力フォーム）を含む <input/>,<textarea/>,<select/> ...等
 */
Note.HtmlNoteToXml = function($i_jquery)
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
	//console.log(i_xml);

	// 現在のカルテを空にする。
	$currentNote.empty();

	$note = $(i_xml);
	//console.log($note[0]);

	$note.children().each(function(){

		var container = null;
	    switch($(this)[0].tagName)
	    {
	        case 'NoteItemContainerComplaint' : 
	            // コンテナを追加し、カルテにコンテナを貼付ける。
	            container = new NoteItemContainerComplaint();
	            break;
	        case 'NoteItemContainerDisease' : // 病名 
	            container = new NoteItemContainerDisease();
	            break;
	        case 'NoteItemContainerMedicalCheck' :　// 検査
	            container = new NoteItemContainerMedicalCheck();
	            break; 
	        case 'NoteItemContainerPrescription' :  // 処方
	            container = new NoteItemContainerPrescription();
	            break;
	        case 'NoteItemContainerOperation' :     // 手術
	            container = new NoteItemContainerOperation();
	            break;
	        case 'NoteItemContainerMemo' : // メモ
	            container = new NoteItemContainerMemo();
	            break;
	        case 'NoteItemContainerScheme' :　// シェーマ
	            container = new NoteItemContainerScheme();
	            break;
	        default :
	            break;
	    }
		container.setByXml($(this));
		$currentNote.append(container.getJQueryObject());

	});
}