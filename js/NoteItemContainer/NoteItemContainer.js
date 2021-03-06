/**
 * ノートアイテムコンテナ
 * @class NoteItemContainer
 * @constructor
 */
var NoteItemContainer = function () {

    /**
     * @property　{String} _title　タイトル
     */
    this._title = NoteItemContainer.ClassName;

    /**
     * @property {String} _left 左座標
     * @example 'auto', '100px'
     */
    this._left = null;

    /**
     * @property {String} _top 上座標
     * @example 'auto', '100px'
     */
    this._top = null;

    /**
     * @param {Object} XML オブジェクト
     */
    this._xml = null;

    /**
     * @param {Object} JQuery オブジェクト
     */
    this._jquery = $(
        '<div ' + 'class="' + NoteItemContainer.ClassName + '" ' + 'style="position:absolute;">' +
        '<h1 id="title">' + NoteItemContainer.ClassName + '</h1>' +
        '</div>'
    )[0];

    // ドラッグ可能に設定する。
    $(this._jquery).draggable({ /* containment: 'parent', scroll: true */ });
    // Sortable, Draggable は併用不可であるため、ソートは実行できない。
    // $(this._jquery).sortable();$(this._jquery).disableSelection();

    /** 
     * JQuery オブジェクトを返す。
     * @method getJQueryObject
     * @return {JQuery Object} JQuery オブジェクト
     */
    this.getJQueryObject = function() {
        return $(this._jquery);
    }

};
(function() {

    // プロトタイプ
    var _proto = NoteItemContainer.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        return NoteItemContainer.ClassName;
    };


    /**
     * Xmlを設定する
     * @method setByXml 
     * @param {JQuery Object} $i_xml XML</NoteItemContainerXXX />
     */
    _proto.setByXml = function($i_xml) {

        this._xml = ($i_xml == undefined) ? null : $i_xml[0];
        this._left = ($i_xml === undefined) ? 'auto' : $i_xml.attr('left');
        this._top = ($i_xml === undefined) ? 'auto' : $i_xml.attr('top');

        this.update();
    }

    /**
     * 表示を更新する。
     * @method update
     */
    _proto.update = function() {
        $(this._jquery).css({
            left: this._left,
            top: this._top
        });
    }

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
NoteItemContainer.ClassName = 'NoteItemContainer';

/**
 * 付箋コンテナHTMLをXMLに保存する。
 * @method HtmlToXml
 * @static
 * @param   $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
 * @return  {String}保存用XML
 */
NoteItemContainer.HtmlToXml = function($i_jquery) {
    var retVal = '';

    var tag = $i_jquery.attr('name');

    // ヘッダー情報（位置）を記入する。
    retVal += '<' + tag + ' ';
    retVal += 'left="' + $i_jquery.css('left') + '" ';
    retVal += 'top="' + $i_jquery.css('top') + '" ';
    retVal += '>';


    // 子要素のXMLを取得しにいく。
    $i_jquery.children('div.NoteItem').each(function() {
        retVal += NoteItem.HtmlToXml($(this));
    })

    retVal += '</' + tag + '>';

    return retVal;
}

