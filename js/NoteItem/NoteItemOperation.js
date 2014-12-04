/**
 * ノートアイテム　手術
 * @class NoteItemOperation
 * @extends NoteItem
 * @constructor
 */
function NoteItemOperation() {
    NoteItem.call(this);

    /**
     * @property {String} ClassName クラス名
     * @static
     */
    arguments.callee.ClassName = 'NoteItemOperation';

    //--JQuery オブジェクト操作---//
    // クラス属性を追加した。
    $(this._jquery).attr('name', NoteItemOperation.ClassName);
    $(this._jquery).addClass(NoteItemOperation.ClassName);
    //--JQuery オブジェクト操作---//

};
(function() {

    // 継承設定 
    var Super = function Super() {};
    Super.prototype = NoteItem.prototype;
    NoteItemOperation.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemOperation.prototype;

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
        return name + ' ' + NoteItemOperation.ClassName;
    };

})();
