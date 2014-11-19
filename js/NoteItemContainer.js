///@summary ノートアイテムコンテナ
///@param 	i_title	タイトル
///@param   $i_xml XMLデータ（JQuery Object)
function NoteItemContainer ($i_xml)
{
	/**
   * @param {String}クラス名
   */
	this._name = 'NoteItemContainer';

  /**
   * @param {String} タイトル
   */
  this._title = this._name;

  /**
   * @param {Object} XML オブジェクト
   */
  this._xml = ($i_xml == undefined) ? null : $i_xml[0];
		
	///@param HTML
  var leftpos = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('left');
  var toppos  = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('top');

  var html = 
  '<div ' + 
    'class="' + this._name + '" ' + 
    'style="position:absolute;">' + 
      '<h1 id="title">' + this._name + '</h1>' + 
  '</div>';

  /**
   * @param {Object} JQuery オブジェクト
   */
  this._jquery = $(html)[0];

    // 位置を移動する。
  $(this._jquery).css({left : leftpos, top : toppos});
	
	// 親要素内のみドラッグ可能に設定する。
	$(this._jquery).draggable({
    // containment: 'parent',
    // scroll: true		
	});

	/** 
   * JQuery オブジェクトを返す。
   * @method getJQueryObject
	 * @return {JQuery Object} JQuery オブジェクト
   */
	this.getJQueryObject = function () 
	{
    //console.log($(this._jquery)[0]);
		return $(this._jquery);
	}

};(function() {

  // プロトタイプ
  var _proto = NoteItem.prototype;
  // メンバメソッド

  _proto.getName = function() {
      return this._name;
  };

  _proto.setName = function(name) {
      this._name = name;
  };
})();

/// @summary 	付箋コンテナHTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return 	保存用XML
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

