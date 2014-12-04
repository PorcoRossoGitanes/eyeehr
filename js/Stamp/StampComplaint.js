/**
 * 主訴スタンプクラス
 * @class StampComplaint
 * @constructor
 * @extends Stamp
 */
var StampComplaint = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampComplaint.ClassName);
    $(this._jquery).addClass(StampComplaint.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {
        var item = Stamp.CreateNoteItem(this, StampComplaint.To);
        item.appendTo('[name="' + StampComplaint.To + '"]');
    });

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampComplaint.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampComplaint.prototype;

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
        return name + ' ' + StampComplaint.ClassName;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampComplaint.ClassName = 'StampComplaint';

/**
 * @property {String} To 貼付先
 * @static
 */
StampComplaint.To =  'NoteItemContainerComplaint';
