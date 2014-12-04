/**
 * 手術スタンプリストクラス　
 * @class StampListOperation
 * @constructor
 */
var StampListOperation = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListOperation.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '手術';

    //--JQuery オブジェクト操作---//
	$(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//


};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListOperation.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListOperation.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListOperation.ClassName = 'StampListOperation';