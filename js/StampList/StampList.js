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