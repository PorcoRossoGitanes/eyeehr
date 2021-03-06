/**
 * ノートアイテム　メモ
 * @class NoteItemMemo
 * @extends NoteItem
 * @constructor
 */
var NoteItemMemo = function () {

    NoteItem.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', NoteItemMemo.ClassName);
    $(this._jquery).addClass(NoteItemMemo.ClassName);
    //--JQuery オブジェクト操作---//
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = NoteItem.prototype;
    NoteItemMemo.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemMemo.prototype;

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
        return name + ' ' + NoteItemMemo.ClassName;
    };
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
NoteItemMemo.ClassName = 'NoteItemMemo';

