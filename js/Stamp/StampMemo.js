/**
 * メモスタンプクラス
 * @class StampMemo
 * @constructor
 * @extends Stamp
 */
var StampMemo = function () {

    Stamp.call(this);

    //--JQuery オブジェクト操作---//
    $(this._jquery).attr('name', StampMemo.ClassName);
    $(this._jquery).addClass(StampMemo.ClassName);
    //--JQuery オブジェクト操作---//

    /**
     * @event スタンプ（ボタン）がクリックされたときに、ノートアイテムを所定のノートアイテムコンテナに添付する。
     */
    $(this._jquery).click(function() {
        // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
        var selector = '[name="' + StampMemo.To + '"]';
        if ($(selector).lentgh > 0)
        {
            var item = Stamp.CreateNoteItem(this, StampMemo.To);
            item.appendTo(selector);
        }
    });
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = Stamp.prototype;
    StampMemo.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampMemo.prototype;

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
        return name + ' ' + StampMemo.ClassName;
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampMemo.ClassName = 'StampMemo';

/**
 * @property {String} To 貼付先
 * @static
 */
StampMemo.To =  'NoteItemContainerMemo';
