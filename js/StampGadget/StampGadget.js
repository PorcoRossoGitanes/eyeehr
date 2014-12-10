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

    //console.log(this._jquery);

    //----- スタンプを自動生成する。 -----------------------------------------------
    var json = Config.Load();
    for (var i in json.Stamp) {
        var key = json.Stamp[i].key;
        var selector = json.Stamp[i].selector;
        if (selector != '') {
            var xml = Stamp.LoadXml(key); //console.log(xml);
            StampList.SetStamp(key, selector, xml);
        }
    }

    //----- アコーディオンメニューを作成する。 --------------------------------------
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

