/**
 * 注射スタンプクラス
 * @class StampInjection
 * @constructor
 * @extends Stamp
 */
var StampInjection = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampInjection.ClassName);
    $(this._jquery).addClass(StampInjection.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {    
        // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
        var selector = '[name=' + StampInjection.To + ']';
        if ($(selector).length > 0)
        {
            var item = Stamp.CreateNoteItem(this, StampInjection.To);
            item.appendTo(selector);            
        }
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
        return name + ' ' + StampInjection.ClassName;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampInjection.ClassName = 'StampInjection';

/**
 * @property {String} To 貼付先
 * @static
 */
StampInjection.To =  'NoteItemContainerTreatment';
