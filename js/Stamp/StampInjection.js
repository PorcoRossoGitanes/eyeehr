/**
 * 注射スタンプクラス
 * @class StampInjection
 * @constructor
 * @extends Stamp
 */
function StampInjection() {
    // 親クラス(Parent)のメンバ変数を継承
    Stamp.call(this);

    /**
     * @property {String} _name クラス名
     */
    this._name = 'StampInjection';

    /**
     * @param {String} XML
     * @static
     */
    arguments.callee.Xml = '';

    //--JQuery オブジェクト操作---//
    // クラス属性を追加した。
    $(this._jquery).attr('name', this._name);
    $(this._jquery).addClass(this._name);
    //--JQuery オブジェクト操作---//

    $(this._jquery).click(function() {
        // TODO : 手術ではなく処置として登録する。
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
    StampInjection.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampInjection.prototype;

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
