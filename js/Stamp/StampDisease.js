/**
 * 病名（所見）スタンプクラス
 * @class StampDisease
 * @constructor
 * @extends Stamp
 */
function StampDisease() {
    Stamp.call(this);

    /**
     * @property {String} ClassName クラス名
     * @static
     */
    arguments.callee.ClassName = 'StampDisease';

    /**
     * @property {String} To 貼付先
     * @static
     */
    arguments.callee.To =  'NoteItemContainerDisease';

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampDisease.ClassName);
    $(this._jquery).addClass(StampDisease.ClassName);
    //--JQuery オブジェクト操作---//

    $(this._jquery).click(function() {
        var item = new NoteItemDisease();

        item.setTitle($(this).attr('title'));

        item.appendTo('[name="' + StampDisease.To + '"]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampDisease.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampDisease.prototype;

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
        return name + ' ' + StampDisease.ClassName;
    }
})();
