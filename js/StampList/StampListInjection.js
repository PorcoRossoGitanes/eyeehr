/**
 * 注射スタンプリストクラス　
 * @class StampListInjection
 * @constructor
 */
var StampListInjection = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListInjection.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '注射';

    //--JQuery オブジェクト操作---//
	$(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListInjection.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListInjection.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListInjection.ClassName = 'StampListInjection';