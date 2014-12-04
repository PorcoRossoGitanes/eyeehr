
/**
 * ノートアイテム　処置
 * @class NoteItemTreatment
 * @extends NoteItem
 * @constructor
 */
var NoteItemTreatment = function () {
    
    NoteItem.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', NoteItemTreatment.ClassName);
    $(this._jquery).addClass(NoteItemTreatment.ClassName);
    //--JQuery オブジェクト操作---//
};
(function() {

    // 継承設定 
    var Super = function Super() {};
    Super.prototype = NoteItem.prototype;
    NoteItemTreatment.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemTreatment.prototype;

    /** 
     * XMLを設定する。
     * @method setByXml
     * @param {String} i_xml XML文字列
     */
    _proto.setByXml = function(i_xml) {
        if (i_xml !== undefined) {
            if ($(i_xml)[0].tagName == $(this._jquery).attr('name')) {
                _super.setByXml.call(this, i_xml);
            }
        }
    }

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        var name = _super.getName.call(this);
        return name + ' ' + NoteItemTreatment.ClassName;
    };

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
NoteItemTreatment.ClassName = 'NoteItemTreatment';
