/**
 * カルテノート
 * @class Note 
 * @constructor
 */
 function Note() {

 	this._patientId = '';
    /**
     * @property {String} _collection コレクションパス
     * (root)/Note/Patient-9999(*1)/Patient-n(*2)/yyyymmdd/hhmmss
     * @private
     */
     this._collection = '';

    /**
     * @property {String} _filename [保存先]ファイル名
     * @private
     */
     this._filename =  '';

     this._yyyyMMdd = '';
     this._hhmmss = '';

    /**
     * @property {String} _url [保存先]URL
     * @private
     */
     this._url = '';

    /**
     * JQuery オブジェクト
     * @type {Object}
     */
    $jquery = $('[name="' + Note.ClassName + '"]');

	// カルテ(JQuery オブジェクト)を空にする。
	$jquery.empty();

	// NoteContainerを追加する。
	var containerComplaint = new NoteItemContainerComplaint();
	$jquery.append(containerComplaint.getJQueryObject());
	var containerDisease = new NoteItemContainerDisease();
	$jquery.append(containerDisease.getJQueryObject());
	var containerMedicalCheck = new NoteItemContainerMedicalCheck();
	$jquery.append(containerMedicalCheck.getJQueryObject());
	var containerTreatment= new NoteItemContainerTreatment();
	$jquery.append(containerTreatment.getJQueryObject());
	var containerPrescription = new NoteItemContainerPrescription();
	$jquery.append(containerPrescription.getJQueryObject());
	var containerOperation = new NoteItemContainerOperation();
	$jquery.append(containerOperation.getJQueryObject());
	var containerMemo = new NoteItemContainerMemo();
	$jquery.append(containerMemo.getJQueryObject());
	// var containerScheme = new NoteItemContainerScheme();
	// $jquery.append(containerScheme.getJQueryObject());
	
};(function() {

	/**
	 * プロトタイプ
	 * @type {Object}
	 */
	 var _proto = Note.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */ 
     _proto.getName = function() 
     {
     	return Note.ClassName;
     }

    /**
     * コレクションパスを取得する。
     * @method getCollection
     * @return コレクションパス
     */
    _proto.getCollection = function ()
    {
    	return this._collection + this._filename;
    }

    /**
     * @summary カルテ（XMLファイル）を保存する
     */
	_proto.saveXml = function ()
	{
		var ret = true;

		// 　NoteItemContainerのコレクションを作成し、各NoteItemを作成する。
		if(ret)
		{

		}

		// NoteItemをファイルとして保存する。

		// -------- (旧ソースコード)
		// 指定のカルテをXML(<note />)に変換する。
		var xml = ''; 
		$jquery.each(function(){ 
			xml = Note.HtmlNoteToXml($(this));
		});

		// 指定のファイルパスにXMLデーターを保存する。
		Utility.SaveXml(this._collection + this._filename, xml); 

		return ret;
	}

	/**
	 * @summary カルテ（XMLファイル）を読込む。
	 * @param {String} i_url URL
	 */
	_proto.loadXml = function (i_url)
	{
		Utility.LoadXml('REST', i_url, '', this.setByXml);
	}

	/**
	 * XMLからカルテを設定する。
	 * @static
	 * @method setByXml
	 * @param {String/Object} i_xml XML <Note />
	 */
	 _proto.setByXml = function (i_xml)
	 {
		// 現在のカルテを空にする。
		$jquery.empty();

		$note = $(i_xml);

		$note.children().each(function(){

			var container = null;
			switch($(this)[0].tagName)
			{
                case NoteItemContainerComplaint.ClassName : // 主訴
                container = new NoteItemContainerComplaint();
                break;
                case NoteItemContainerDisease.ClassName : // 病名 
                container = new NoteItemContainerDisease();
                break;
                case NoteItemContainerMedicalCheck.ClassName :　// 検査
                container = new NoteItemContainerMedicalCheck();
                break; 
                case NoteItemContainerTreatment.ClassName :  // 処置
                container = new NoteItemContainerTreatment();
                break;
                case NoteItemContainerPrescription.ClassName :  // 処方
                container = new NoteItemContainerPrescription();
                break;
                case NoteItemContainerOperation.ClassName :     // 手術
                container = new NoteItemContainerOperation();
                break;
                case NoteItemContainerMemo.ClassName : // メモ
                container = new NoteItemContainerMemo();
                break;
                case NoteItemContainerScheme.ClassName :　// シェーマ
                container = new NoteItemContainerScheme();
                break;
                default :
                break;
		    }
		    container.setByXml($(this));
		    $jquery.append(container.getJQueryObject());
		});
	}
 })();

 /**
 * 指定患者の指定日時のカルテを新規作成する。
 * @method Create
 * @param {Number} i_patientId 患者番号
 * @param {String} i_yyyyMMdd 作成日(yyyyMMdd)
 * @param {String} i_hhmmss 作成時刻(hhmmss)
 * @return {Note} Noteオブジェクト
 */
Note.Create = function(i_patientId, i_yyyyMMdd, i_hhmmss)
{
	var ret = new Note();

	// 患者番号を設定する。
	ret._patientId = i_patientId;

	// 日時を設定する。
	ret._yyyyMMdd = i_yyyyMMdd; 
	ret._hhmmss = i_hhmmss; 

	// patient-to-XXXXのXXXX(万の桁+99999)の部分を検出する。1の場合、9999、10000の場合、19999となる。
	var to = 10000 * (Math.floor(i_patientId / 10000) + 1) - 1;

	// 保存先を設定する。
	ret._collection = Note.CollectionRoot + 'patient-to-' + to + '/patient-' + ret._patientId + '/' + ret._yyyyMMdd + '/' + ret._hhmmss + '/';
    ret._filename = Note.ClassName + '-' + ret._patientId + '-' + ret._yyyyMMdd + '-' + ret._hhmmss + '-' + '' + '.xml';
    ret._url = ret._collection + ret._filename;

	// （１）カルテのコレクションを作成する。
	var result = true;
	if (result) result = Utility.CreateCollection(ret._collection);

	// （２）画像用のコレクションを作成する。
	if (result) result = Utility.CreateCollection(ret._collection + 'IMG');

	// （３）各種コンテナ用のコレクションを作成する。
	if (result)
	{
		result = result && NoteItemContainerComplaint.CreateCollection(ret._collection);
		result = result & NoteItemContainerDisease.CreateCollection(ret._collection);
		result = result & NoteItemContainerMedicalCheck.CreateCollection(ret._collection);
		result = result & NoteItemContainerMemo.CreateCollection(ret._collection);
		result = result & NoteItemContainerOperation.CreateCollection(ret._collection);
		result = result & NoteItemContainerPrescription.CreateCollection(ret._collection);
		result = result & NoteItemContainerScheme.CreateCollection(ret._collection);
		result = result & NoteItemContainerTreatment.CreateCollection(ret._collection);
	}

    // URLにコレクション先を退避する。
	$jquery.data('url', ret._collection);

	return ret;
}

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

/**
 * @property {String} Classnameクラス名
 * @static
 * @type {String}
 * @default Note
 */
Note.ClassName = 'Note';

Note.CollectionRoot = '/db/apps/eyeehr/data/Note/';


