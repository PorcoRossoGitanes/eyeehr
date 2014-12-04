/**
 * スタンプリストクラス
 * @class StampList
 * @constructor
 */
var StampList = function (i_hasOne, i_canSelectTo) {

	/**
	 * @property {String} _id ID
	 */
	this._id = '';

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '';

	/**
	 * @property {Boolean} スタンプが1個のみ
	 */
	this._hasOne = i_hasOne;

	/**
	 * @property {Boolean} 張付先を選択できる
	 */
	this._canSelectTo = i_canSelectTo;

	// 貼付先選択フォーム
    var selectTo = 
        '<div class="radio">' +
        '<label><input type="radio" name="SelectTo" value="検査"> 検査</label>' +
        '<label><input type="radio" name="SelectTo" value="処方"> 処方</label>' +
        '<label><input type="radio" name="SelectTo" value="処置"> 処置</label>' +
        '<label><input type="radio" name="SelectTo" value="処置"> 手術</label>' +
        '</div>';

	// 検索フォーム
    var canSearch =         
        '<table>' +
        '<tbody>' +
        '<td><input type="text" class="form-control mini" value=""/></td>' +
        '<td><button class="btn btn-default btn-xs">検索</button></td>' +
        '</tbody>' +
        '</table>';

    /**
     * @property {Objedt} _head ヘッダー
     */
    this._head = $('<h3>' + this._title +'</h3>')[0];

    if(this._hasOne) 
    {
        $(this._head).addClass('ui-state-disabled');
    }

    /**
     * @property {Objedt} _body ボディー（本体）
     */
    this._body = $(
        '<div class="' + StampList.ClassName + '">' +
        (this._canSelectTo ? selectTo : '') +
        (this._hasOne ? '' : canSearch) + 
        '</div>'
    )[0];
    console.log(this._body);
};
(function() {

    /**
     * @param {Object} プロトタイプ
     */
    var _proto = StampList.prototype;

    /**
     * JQueryオブジェクトを出力する
     * @return {Object} JQuery オブジェクト
     */
    _proto.getJQueryHead = function() {
        return this._head;
    }

    /**
     * JQueryオブジェクトを出力する
     * @return {Object} JQuery オブジェクト
     */
    _proto.getJQueryBody = function() {
        return this._body;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampList.ClassName = 'StampList';

/** 
 * スタンプを生成する。
 * @param {String} i_key キー
 * @param {String} i_selector スタンプの張付先(JQueryセレクタ)
 * @param {XmlDocument} i_stampsXml スタンプリスト(XML)
 */
StampList.SetStamp = function (i_key, i_selector, i_stampsXml) {
    // 貼付先を取得する。
    $stampList = $(i_selector);

    // XMLデーターをもとにボタンを貼付ける。
    for (var index = 0; index < i_stampsXml.length; index++) {

        var stamp = null;

        switch (i_key) {
            case 'DISEASE':         stamp = new StampDisease();         break;
            case 'INJECTION':       stamp = new StampInjection();       break;
            case 'TREATMENT':       stamp = new StampTreatment();       break;
            case 'OPERATION':       stamp = new StampOperation();       break;
            case 'MEDICAL_CHECK':   stamp = new StampMedicalCheck();    break;
            case 'MEDICAL_PRODUCT': stamp = new StampMedicalProduct();  break;
            case 'MACHINE':         stamp = new StampMachine();         break;
            case 'PRIVATE_EXPENSE': stamp = new Stamp();                break;
            case 'PRACTICE':
            case 'COMMENT':
            default:                stamp = new Stamp();                break;
        }

        stamp.setByXml(Utility.XmlToStr(i_stampsXml[index]));
        $stampList.append(stamp.getJQueryObject());
    };
}