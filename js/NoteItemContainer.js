///@summary ノートアイテムコンテナ
///@param 	i_name	名前
///@param 	i_title	タイトル
///@param   $i_xml XMLデータ（JQuery Object)
function NoteItemContainer (i_name, i_title, $i_xml)
{
	///@param クラス名
	this._name = 'NoteItemContainer';
		
	///@param HTML
    var leftpos = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('left');
    var toppos  = ($i_xml === undefined)  ? 'auto' : $i_xml.attr('top');
    //console.log(i_name + left + top);
    var html = '<div ' + 
        'class="' + 'NoteItemContainer' + '" ' + 
        'name="' + i_name + '" ' + 
        'style="position:absolute;' + 
        //'left=' + left + ';top=' + top+ ';' + 
        '">' + 
        '<h1>' + i_title + '</h1>' + 
        //'<div id="attached"></div>' + 
    '</div>';
	$jqueryNoteItemContainer = $(html);

    // 位置を移動する。
    $jqueryNoteItemContainer.css({left : leftpos, top : toppos});
	
	// 親要素内のみドラッグ可能に設定する。
	$jqueryNoteItemContainer.draggable({
        containment: 'parent',
        scroll: false,		
	});

	///@summary JQuery Objectを出力する
	///@return  JQuery Object
	this.getJQueryObject = function () 
	{
		return $jqueryNoteItemContainer;
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

