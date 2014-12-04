/**
 * ノートアイテム　病名
 * @class  NoteItemDisease
 * @extends NoteItem
 * @constructor
 */
function NoteItemDisease() {

    NoteItem.call(this);

    /**
     * @property {String} ClassName クラス名
     * @static
     */
    arguments.callee.ClassName = 'NoteItemDisease';

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', NoteItemDisease.ClassName);
    $(this._jquery).addClass(NoteItemDisease.ClassName);
    //--JQuery オブジェクト操作---//

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = NoteItem.prototype;
    NoteItemDisease.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemDisease.prototype;

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
        return name + ' ' + NoteItemDisease.ClassName;
    };
})();
