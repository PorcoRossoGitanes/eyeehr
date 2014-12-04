/**
 * 検査スタンプリストクラス　
 * @class StampListMedicalCheck
 * @constructor
 */
var StampListMedicalCheck = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListMedicalCheck.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '検査';

    //--JQuery オブジェクト操作---//
	$(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListMedicalCheck.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListMedicalCheck.ClassName = 'StampListMedicalCheck';