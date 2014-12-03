/**
 * カルテ項目コンテナ（検査）
 * @class NoteItemContainerMedicalCheck
 * @extends NoteItemContainer
 * @constructor
 */
function NoteItemContainerMedicalCheck() {
    NoteItemContainer.call(this);

    /**
     * @property {String} _name クラス名
     */
    this._name = 'NoteItemContainerMedicalCheck';

    /**
     * @param {String} タイトル
     */
    this._title = '検査';

    /**
     * @param {String} 左座標
     */
    this._left = '350px';

    /**
     * @param {String} 上座標
     */
    this._top = '170px';

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
    NoteItemContainerMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    var _proto = NoteItemContainerMedicalCheck.prototype;

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

        // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
        if ($i_xml !== undefined) {
            if ($i_xml[0].tagName == $(this._jquery).attr('name')) {
                for (var index = 0; index < this._xml.children.length; index++) {
                    var item = new NoteItemMedicalCheck();
                    item.setByXml($(this._xml.children[index]));
                    $(this._jquery).append(item.getJQueryObject());
                }
            }
        }
    }

})();
