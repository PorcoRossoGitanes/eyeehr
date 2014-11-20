/**
 * ノートアイテムコンテナ
 * @class NoteItemContainer
 */
function NoteItemContainer ()
{
	/**
   * @param {String} クラス名
   */
	this._name = 'NoteItemContainer';

  /**
   * @param {String} タイトル
   */
  this._title = this._name;

  /**
   * @param {String} 左座標
   * @example 'auto', '100px'
   */
  this._left = null;

  /**
   * @param {String} 上座標
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
    '<div ' + 'class="' + this._name + '" ' + 'style="position:absolute;">' + 
      '<h1 id="title">' + this._name + '</h1>' + 
    '</div>'
  )[0];
	
	// 親要素内のみドラッグ可能に設定する。
	$(this._jquery).draggable({/* containment: 'parent', scroll: true */});

	/** 
   * JQuery オブジェクトを返す。
   * @method getJQueryObject
	 * @return {JQuery Object} JQuery オブジェクト
   */
	this.getJQueryObject = function () 
	{
		return $(this._jquery);
	}

};(function() {

  // プロトタイプ
  var _proto = NoteItemContainer.prototype;

  /**
   * クラス名（親クラス...現在のクラス）を取得する
   * @method getName
   * @return {String} クラス名（親クラス...現在のクラス）
   */
  _proto.getName = function() {
      return this._name;
  };


  /**
   * Xmlを設定する
   * @param {JQuery Object} $i_xml XML</NoteItemContainerXXX />
   */
  _proto.setByXml = function($i_xml) 
  {

    this._xml = ($i_xml == undefined) ? null : $i_xml[0];
    this._left = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('left');
    this._top  = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('top');
    
    this.update();    
  }

  /**
   * 表示を更新する。
   * @method update
   */
  _proto.update = function ()
  {
    $(this._jquery).css({left : this._left, top : this._top});    
  }

})();

/**
 * 付箋コンテナHTMLをXMLに保存する。
 * @method NoteItemContainer.HtmlToXml
 * @static 
 * @param 	$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
 * @return 	{String}保存用XML
 */
NoteItemContainer.HtmlToXml = function($i_jquery)
{
	var retVal = '';

	var tag = $i_jquery.attr('name');

    // ヘッダー情報（位置）を記入する。
	retVal += '<' + tag + ' ';
    retVal += 'left="' + $i_jquery.css('left') + '" ';
    retVal += 'top="' + $i_jquery.css('top') + '" ';
    retVal += '>';


	// 子要素のXMLを取得しにいく。
	$i_jquery.children('div.NoteItem').each(function () {
		retVal += NoteItem.HtmlToXml($(this));
	})

	retVal += '</' + tag + '>';

	return retVal;
}

