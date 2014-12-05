/**
 * ノートアイテムコンテナー　病名
 * @class NoteItemContainerDisease
 * @extends NoteItemContainer
 * @constructor
 */
var NoteItemContainerDisease = function () {
    NoteItemContainer.call(this);

    /**
     * @property　{String} _title　タイトル
     */
    this._title = '病名';

    /**
     * @property {String} _left 左座標
     * @example 'auto', '100px'
     */
    this._left = '350px';

    /**
     * @property {String} _top 上座標
     * @example 'auto', '100px'
     */
    this._top = '100px';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(NoteItemContainerDisease.ClassName);
    $(this._jquery).attr('name', NoteItemContainerDisease.ClassName);
    $(this._jquery).find('#title').text(this._title);
    //--JQuery オブジェクト操作---//

    this.update();

};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerDisease.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemContainerDisease.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        var name = _super.getName.call(this);
        return name + ' ' + NoteItemContainerDisease.ClassName;
    };

    /**
     * XMLを設定する
     * @method setByXml
     * @param {JQuery Object} $i_xml XML</NoteItemContainerXXX />
     */
    _proto.setByXml = function($i_xml) {
        _super.setByXml.call(this, $i_xml);

        // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
        if ($i_xml !== undefined) {
            if ($i_xml[0].tagName == $(this._jquery).attr('name')) {
                for (var index = 0; index < this._xml.children.length; index++) {
                    var item = new NoteItemDisease();
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
NoteItemContainerDisease.ClassName = 'NoteItemContainerDisease';

/**
 * コレクションを作成する。
 * @method CreateCollection
 * @static
 * @param {String} i_noteCollection Noteのコレクションパス
 * @return 実行結果（true=成功, false=失敗）
 */
NoteItemContainerDisease.CreateCollection = function (i_noteCollection)
{
    var ret = Utility.CreateCollection(i_noteCollection + NoteItemContainerDisease.ClassName);
    return ret;
}

