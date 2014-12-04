/**
 * 処置スタンプクラス
 * @class StampTreatment
 * @constructor
 * @extends Stamp
 */
var StampTreatment = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampTreatment.ClassName);
    $(this._jquery).addClass(StampTreatment.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {
        var item = Stamp.CreateNoteItem(this, StampTreatment.To);
        item.appendTo('[name="' + StampTreatment.To + '"]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampTreatment.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampTreatment.prototype;

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
        return name + ' ' + StampTreatment.ClassName;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampTreatment.ClassName = 'StampTreatment';

/**
 * @property {String} To 貼付先
 * @static
 */
StampTreatment.To =  'NoteItemContainerOperation';
