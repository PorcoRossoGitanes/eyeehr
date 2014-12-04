/**
 * 医薬品スタンプクラス
 * @class StampMedicalProduct
 * @constructor
 * @extends Stamp
 */
var StampMedicalProduct = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampMedicalProduct.ClassName);
    $(this._jquery).addClass(StampMedicalProduct.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {
        var item = Stamp.CreateNoteItem(this, StampMedicalProduct.To);
        item.appendTo('[name="' + StampMedicalProduct.To + '"]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampMedicalProduct.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampMedicalProduct.prototype;

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
        return name + ' ' + StampMedicalProduct.ClassName;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampMedicalProduct.ClassName = 'StampMedicalProduct';

/**
 * @property {String} To 貼付先
 * @static
 */
StampMedicalProduct.To =  'NoteItemContainerPrescription';
