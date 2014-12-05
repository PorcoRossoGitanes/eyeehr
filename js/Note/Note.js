/**
 * カルテノート
 * @class Note 
 * @constructor
 */
 function Note() {

    /**
     * クラス名
     * @private
     * @type {String}
     * @default Note
     */
	 this._name = 'Note';

    /**
     * コレクション
     * (root)/Note/Patient-9999(*1)/Patient-n(*2)/yyyymmdd/hhmmss
     * @private
     * @type {String}
     */
     this._collection = '';

    /**
     * [保存先]ファイル名
     * @type {String} 
     */
     this._filename =  '';

    /**
     * [保存先]URL
     * @type {String}
     */
     this._url = '';

    /**
     * JQuery オブジェクト
     * @type {Object}
     */
    $jquery = $('[name="' + this._name + '"]');

	// カルテを空にする。
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
     	return this._name;
     }

    /*
     * 患者を設定する。
	 * @method setPatient
	 * @param {Number} i_patientId 患者番号(0詰めなし)
     */
    _proto.setPatient = function(i_patientId) {
    	
    	var yyyyMMdd = Utility.GetCurrentDate();
    	var hhmmss = Utility.GetCurrentTime();
    	
    	var to = 10000 * (Math.floor(i_patientId / 10000) + 1) - 1;

    	this._collection = 
    		'/db/apps/eyeehr/data/Note/patient-to-' + to + 
    		'/patient-' + i_patientId + '/' + yyyyMMdd + '/' + hhmmss + '/';
	    this._filename = this._name + '-' + i_patientId + '-' + 
	    	yyyyMMdd + '-' + hhmmss + '-' + '' + '.xml';
	    
	    this._url = this._collection + this._filename;

	    // URLにコレクション先を退避する。
		$jquery.data('url', this._collection);
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
		// （１）カルテのコレクションを作成する。
		if (ret)
		{
			ret = Utility.CreateCollection(this._collection);
			console.log(ret);
		}
		// 　NoteItemContainerのコレクションを作成する。

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
				case 'NoteItemContainerComplaint' : // 主訴
	            container = new NoteItemContainerComplaint();
	            break;
		        case 'NoteItemContainerDisease' : // 病名 
		        container = new NoteItemContainerDisease();
		        break;
		        case 'NoteItemContainerMedicalCheck' :　// 検査
		        container = new NoteItemContainerMedicalCheck();
		        break; 
		        case 'NoteItemContainerTreatment' :  // 処置
		        container = new NoteItemContainerTreatment();
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
		    $jquery.append(container.getJQueryObject());
		});
	}
 })();

 /**
 * 患者を設定する。
 * @method Create
 * @param {Number} i_patientId 患者番号
 * @return {Note} Noteオブジェクト
 */
Note.Create = function(i_patientId)
{
	var ret = new Note();

	ret.setPatient(i_patientId);

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



