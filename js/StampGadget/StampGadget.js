/**
 * スタンプガジェットクラス
 * @class Stamp
 * @constructor
 */
var StampGadget = function () {

    this._id = 'StampGadget';

    /**
     * @property JQuery オブジェクト
     * @type {Object}
     */
    this._jquery = $('#' + this._id)[0];

    var stampList = null;

    stampList = new StampListComplaint();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListDisease();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListMedicalCheck();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListTreatment();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListOperation();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListMedicalProduct();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListInjection();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListMachine();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    stampList = new StampListMemo();
    $(this._jquery).append(stampList.getJQueryHead()); 
    $(this._jquery).append(stampList.getJQueryBody()); 

    //console.log(this._jquery);

    //----- スタンプを自動生成する。 -----------------------------------------------
    var json = Config.Load();
    for (var i in json.Stamp) {
        var key = json.Stamp[i].key;
        var selector = json.Stamp[i].selector;
        if (selector != '') {
            Stamp.LoadXml(key, function(result) {
                //result[0]がルートノードとなる。
                StampList.SetStamp(key, selector, result[0].children);
            });
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

