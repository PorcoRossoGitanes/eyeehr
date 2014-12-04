/**
 * 処置スタンプリストクラス　
 * @class StampListTreatment
 * @constructor
 */
var StampListTreatment = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListTreatment.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '処置';
    
    //--JQuery オブジェクト操作---//
	$(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//
};
(function() {
    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListTreatment.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListTreatment.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListTreatment.ClassName = 'StampListTreatment';