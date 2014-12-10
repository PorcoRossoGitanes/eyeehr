/**
 * スタンプガジェットクラス
 * @class Stamp
 * @constructor
 */
var StampGadget = function () {

    /**
     * @property {String} _id ID
     */
    this._id = 'StampGadget';

    /**
     * @property {String} _selector セレクタ
     */
    this._selector = '#' + this._id;

    /**
     * @property JQuery オブジェクト
     * @type {Object}
     */
    this._jquery = $(this._selector)[0];

    // スタンプリストを作成し、スタンプを追加する。
    var stampList = null;
    stampList = new StampListComplaint(); stampList.appendTo(this._selector);
    stampList = new StampListDisease(); stampList.appendTo(this._selector);
    stampList = new StampListMedicalCheck(); stampList.appendTo(this._selector);
    stampList = new StampListTreatment(); stampList.appendTo(this._selector);
    stampList = new StampListOperation(); stampList.appendTo(this._selector);
    stampList = new StampListMedicalProduct(); stampList.appendTo(this._selector);
    stampList = new StampListInjection(); stampList.appendTo(this._selector);
    stampList = new StampListMachine(); stampList.appendTo(this._selector);
    stampList = new StampListMemo(); stampList.appendTo(this._selector);

    // アコーディオンメニューを作成する。 
    $(this._jquery).accordion({ heightStyle: "fill", active: 1 });
};
(function() {

    /**
     * @property {Object} プロトタイプ
     * @private
     */
    var _proto = StampGadget.prototype;

})();

StampGadget.ClassName = 'StampGadget';

