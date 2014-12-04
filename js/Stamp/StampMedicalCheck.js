/**
 * 検査スタンプクラス
 * @class StampMedicalCheck
 * @constructor
 * @extends Stamp
 */
function StampMedicalCheck() {
    // 親クラス(Parent)のメンバ変数を継承
    Stamp.call(this);

    /**
     * @property {String} ClassName クラス名
     * @static
     */
    arguments.callee.ClassName = 'StampMedicalCheck';

    /**
     * @property {String} To 貼付先
     * @static
     */
    arguments.callee.To =  'NoteItemContainerMedicalCheck';

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampMedicalCheck.ClassName);
    $(this._jquery).addClass(StampMedicalCheck.ClassName);
    //--JQuery オブジェクト操作---//

    $(this._jquery).click(function() {

        var item = new NoteItemMedicalCheck();

        item.setTitle($(this).attr('title'));

        var xml = $(this).data('xml');
        item.setOrca($(xml).children('Orca')[0]);

        item.appendTo('[name="' + StampMedicalCheck.To + '"]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampMedicalCheck.prototype;

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
        return name + ' ' + StampMedicalCheck.ClassName;
    }
})();
