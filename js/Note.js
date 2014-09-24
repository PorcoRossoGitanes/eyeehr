///@summary カルテ
function Note() {
};(function() {

  // プロトタイプ
  var _proto = Note.prototype;
  // メンバメソッド

  _proto.getName = function() {
      return this._name;
  };

  _proto.setName = function(name) {
      this._name = name;
  };
})();

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
Note.HtmlNoteToXml = function($i_jquery)/* $('#note')*/
{
	var retVal = '';
	var tag = $i_jquery.attr('name');

	retVal += '<' + tag + ' id="' + $i_jquery.attr('id') + '">';

	//TODO :  ヘッダー情報を保存する。
	$i_jquery.children('div.NoteItemContainer').each(function () {
		retVal += NoteItemContainer.HtmlToXml($(this));
	})

	retVal += '</' + tag + '>';

	// // 入力タグとなりうる要素を取得する。
	// const childElementTags = new Array('DIV', 'INPUT'/*, 'TEXTAREA', 'SELECT'*/);

	// // name属性をタグとして使用する。
	// var tag = $i_jquery.attr('name');

	// // XMLを生成する。
	// if(tag !== undefined)
	// {
	// 	retVal += '<' + tag + '>';
	
	// 	// 子供を持っている場合は再起的にXMLを生成する。
	// 	// テーブルなどで形式を制御する場合もあるので、findを使用する。
	// 	var inputChildrenCnt = $i_jquery.find(childElementTags.toString()).length;
	// 	var containInputChildren =  inputChildrenCnt > 0;

	// 	// 内部文字列を取得する
	// 	switch ($i_jquery[0].tagName)
	// 	{
	// 		case 'DIV' :  // DIVタグの場合
	// 			if($i_jquery.hasClass('NoteItemContainer'))
	// 			{
	// 				// NoteItemContaner要素の場合は、内容を出力しない。
	// 			}
	// 			else if (containInputChildren == false && $i_jquery.attr('name') != '') 
	// 			{
	// 				retVal += $i_jquery.html().replace(/<br>/g, '<br />');
	// 			}
	// 			else 
	// 			{
	// 				//
	// 			}
	// 			break;
	// 		case 'INPUT' : // INPUTタグの場合
	// 			retVal += $i_jquery.val();//$i_jquery.attr('value');
	// 			break;
	// 		// TODO : TEXTAREA
	// 		// TODO : SELECTボックスなど
	// 		default : 
	// 			// それ以外の場合は出力しない。
	// 			break;		
	// 	}

	// 	// 子供の要素を再起的に呼び出す。
	// 	$i_jquery.children().each(function () {
	// 		retVal += Utility.HtmlInputItemToXml($(this));
	// 	})

	// 	retVal += '</' + tag + '>';		
	// }

	return retVal;
}