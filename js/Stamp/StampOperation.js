/**
 * 手術スタンプクラス
 * @class StampOperation
 * @constructor
 * @extends Stamp
 */
function StampOperation() {
    // 親クラス(Parent)のメンバ変数を継承
    Stamp.call(this);

    /**
     * @property {String} _name クラス名
     */
    this._name = 'StampOperation';

    //--JQuery オブジェクト操作---//
    // クラス属性を追加した。
    $(this._jquery).attr('name', this._name);
    $(this._jquery).addClass(this._name);
    //--JQuery オブジェクト操作---//

    $(this._jquery).click(function() {

        var item = new NoteItemOperation();

        item.setTitle($(this).attr('title'));

        var xml = $(this).data('xml');
        item.setOrca($(xml).children('Orca')[0]);

        item.appendTo('[name=NoteItemContainerOperation]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampOperation.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampOperation.prototype;

    /** 
     * XMLを設定する。
     * @method setByXml
     * @param {String/Object} i_xml XML文字列
     */
    _proto.setByXml = function(i_xml) {
            if (i_xml !== undefined) _super.setByXml.call(this, i_xml);
        }
        /**
         * クラス名を取得する。
         * @method getName
         * @return {String} クラス名
         */
    _proto.getName = function() {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    }
})();
