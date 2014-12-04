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

    // var html = 
    //     '<h3 class="ui-state-disabled" onclick="var item = new NoteItemComplaint(); item.appendTo("[name=NoteItemContainerComplaint]");">主訴</h3><div></div>' +
    //     '<h3>病名</h3>' +
    //     '<div class="StampList" id="StampListDisease">' +
    //     search + 
    //     '</div>' +
    //     '<h3>検査</h3>' +
    //     '<div class="StampList" id="StampListMedicalCheck">' + 
    //     search + 
    //     '</div>' +
    //     '<h3>処置</h3>' +
    //     '<div class="StampList" id="StampListTreatment">' +
    //     search + 
    //     '</div>' +
    //     '<h3>手術</h3>' +
    //     '<div class="StampList" id="StampListOperation">' +
    //     search + 
    //     '</div>' +
    //     '<h3>医薬品</h3>' +
    //     '<div class="StampList" id="StampListMedicalProduct">' +
    //     select_to +
    //     search + 
    //     '</div>' +
    //     '<h3>注射</h3>' +
    //     '<div class="StampList" id="StampListInjection">' +
    //     select_to +
    //     search + 
    //     '</div>' +
    //     '<h3>特定機材</h3>' +
    //     '<div class="StampList" id="StampListMachine">' +
    //     select_to +
    //     search + 
    //     '</div>' +
    //     '<h3 class="ui-state-disabled" onclick="var item = new NoteItemMemo(); item.appendTo("[name=NoteItemContainerMemo]")">メモ</h3><div></div> ';
    // $(this._jquery).append(html);

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