/**
 * 検査スタンプクラス
 * @class StampMedicalCheck
 * @constructor
 * @extends Stamp
 */
var StampMedicalCheck = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampMedicalCheck.ClassName);
    $(this._jquery).addClass(StampMedicalCheck.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {
        // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
        var selector = '[name="' + StampMedicalCheck.To + '"]';
        if ($(selector).length > 0)
        {
            var item = Stamp.CreateNoteItem(this, StampMedicalCheck.To);
            item.appendTo(selector);        
        }
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

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampMedicalCheck.ClassName = 'StampMedicalCheck';

/**
 * @property {String} To 貼付先
 * @static
 */
StampMedicalCheck.To =  'NoteItemContainerMedicalCheck';

