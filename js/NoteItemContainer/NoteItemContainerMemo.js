/**
 * ノートアイテムコンテナー　メモ
 * @class NoteItemContainerMemo
 * @extends NoteItemContainer
 * @constructor
 */
function NoteItemContainerMemo() {
    NoteItemContainer.call(this);

    /**
     * @property {String} _name クラス名
     */
    this._name = 'NoteItemContainerMemo';

    /**
     * @property　{String} _title　タイトル
     */
    this._title = 'メモ';

    /**
     * @property {String} _left 左座標
     * @example 'auto', '100px'
     */
    this._left = '800px';

    /**
     * @property{String} _top 上座標
     * @example 'auto', '100px'
     */
    this._top = '240px';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(this._name);
    $(this._jquery).attr('name', this._name);
    $(this._jquery).find('#title').text(this._title);
    //--JQuery オブジェクト操作---//

    this.update();

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMemo.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemContainerMemo.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };

    /**
     * Xmlを設定する
     * @param {JQuery Object} $i_xml XML</NoteItemContainerXXX />
     */
    _proto.setByXml = function($i_xml) {
        _super.setByXml.call(this, $i_xml);

        if ($i_xml !== undefined) {
            if ($i_xml[0].tagName == $(this._jquery).attr('name')) {
                for (var index = 0; index < this._xml.children.length; index++) {
                    var item = new NoteItemMemo();
                    item.setByXml($(this._xml.children[index]));
                    $(this._jquery).append(item.getJQueryObject());
                }
            }
        }
    }

})();
