/**
 * ノートアイテムコンテナー　シェーマ
 * @class NoteItemContainerScheme
 * @extends NoteItemContainer
 * @constructor
 */
var  NoteItemContainerScheme = function() {
    NoteItemContainer.call(this, $i_xml);

    /**
     * @property　{String} _title　タイトル
     */
    this._title = 'シェーマ';

    /**
     * @property {String} _left 左座標
     * @example 'auto', '100px'
     */
    this._left = '800px';

    /**
     * @property {String} _top 上座標
     * @example 'auto', '100px'
     */
    this._top = '30px';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(NoteItemContainerScheme.ClassName);
    $(this._jquery).attr('name', NoteItemContainerScheme.ClassName);
    $(this._jquery).find('#title').text(this._title);
    $(this._jquery).css('left', 800);
    $(this._jquery).css('top', 30);
    //--JQuery オブジェクト操作---//


};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerScheme.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemContainerScheme.prototype;

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() {
        var name = _super.getName.call(this);
        return name + ' ' + NoteItemContainerScheme.ClassName;
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
                    var item = new NoteItemScheme();
                    item.setByXml($(this._xml.children[index]));
                    $(this._jquery).append(item.getJQueryObject());
                }
            }
        }
    }
})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
NoteItemContainerScheme.ClassName = 'NoteItemContainerScheme';

/**
 * コレクションを作成する。
 * @method CreateCollection
 * @static
 * @param {String} i_noteCollection Noteのコレクションパス
 * @return 実行結果（true=成功, false=失敗）
 */
NoteItemContainerScheme.CreateCollection = function (i_noteCollection)
{
    var ret = Utility.CreateCollection(i_noteCollection + NoteItemContainerScheme.ClassName);
    return ret;
}
