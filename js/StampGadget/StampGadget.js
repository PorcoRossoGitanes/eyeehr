/**
 * スタンプガジェットクラス
 * @class Stamp
 * @constructor
 */
var StampGadget = function () {

    this._id = 'NoteItemMenu'
    /**
     * @property JQuery オブジェクト
     * @type {Object}
     */
    this._jquery = $('#' + this._id)[0];

    var select_to = 
        '<div class="radio">' +
        '<label><input type="radio" name="stamp_list_medical_product" value="検査"> 検査</label>' +
        '<label><input type="radio" name="stamp_list_medical_product" value="処方"> 処方</label>' +
        '<label><input type="radio" name="stamp_list_medical_product" value="処置"> 処置</label>' +
        '<label><input type="radio" name="stamp_list_medical_product" value="処置"> 手術</label>' +
        '</div>';

    var search =         
        '<table>' +
        '<tbody>' +
        '<td><input type="text" class="form-control mini" value=""/></td>' +
        '<td><button class="btn btn-default btn-xs">検索</button></td>' +
        '</tbody>' +
        '</table>';

    var html = 
        '<h3 class="ui-state-disabled" onclick="var item = new NoteItemComplaint(); item.appendTo("[name=NoteItemContainerComplaint]");">主訴</h3><div></div>' +
        '<h3>病名</h3>' +
        '<div class="stamp_list" id="disease">' +
        search + 
        '</div>' +
        '<h3>検査</h3>' +
        '<div class="stamp_list" id="medical_check">' + 
        search + 
        '</div>' +
        '<h3>処置</h3>' +
        '<div class="stamp_list" id="treatment">' +
        search + 
        '</div>' +
        '<h3>手術</h3>' +
        '<div class="stamp_list" id="operation">' +
        search + 
        '</div>' +
        '<h3>医薬品</h3>' +
        '<div class="stamp_list" id="medical_product">' +
        select_to +
        search + 
        '</div>' +
        '<h3>注射</h3>' +
        '<div class="stamp_list" id="injection">' +
        select_to +
        search + 
        '</div>' +
        '<h3>特定機材</h3>' +
        '<div class="stamp_list" id="machine">' +
        select_to +
        search + 
        '</div>' +
        '<!--h3 class="ui-state-disabled" onclick="var item = new NoteItemScheme(); item.appendTo("[name=NoteItemContainerScheme]")">シェーマ</h3><div></div-->' +
        '<h3 class="ui-state-disabled" onclick="var item = new NoteItemMemo(); item.appendTo("[name=NoteItemContainerMemo]")">メモ</h3><div></div> ';
    $(this._jquery).append(html);

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