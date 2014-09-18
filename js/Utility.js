///@summary コンストラクタ
function Utility() {
}

///@summary 現在日時を取得する。
Utility.GetCurrentDateTime  = function ()
{
	var retVal = '';
 
    var now = new Date();		
	var yyyy = now.getFullYear().toString();
	var MM = (now.getMonth()+1).toString(); // getMonth() is zero-based
	var dd = now.getDate().toString();
	var hh = now.getHours().toString();
	var mm = now.getMinutes().toString();
    var ss = now.getSeconds().toString();
	retVal = 
		yyyy + (MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + 
		(hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);

	return retVal;
}

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
Utility.HtmlInputItemToXml = function($i_jquery)
{
	var retVal = '';

	// 入力タグとなりうる要素を取得する。
	const childElementTags = new Array('DIV', 'INPUT'/*, 'TEXTAREA', 'SELECT'*/);

	// name属性をタグとして使用する。
	var tag = $i_jquery.attr('name');

	// XMLを生成する。
	if(tag !== undefined)
	{
		retVal += '<' + tag + '>';
	
		// 子供を持っている場合は再起的にXMLを生成する。
		// テーブルなどで形式を制御する場合もあるので、findを使用する。
		var inputChildrenCnt = $i_jquery.find(childElementTags.toString()).length
		var containInputChildren =  inputChildrenCnt > 0;

		// 内部文字列を取得する
		switch ($i_jquery[0].tagName)
		{
			case 'DIV' :  // DIVタグの場合
				if($i_jquery.hasClass('NoteItemContainer'))
				{
					// NoteItemContaner要素の場合は、
				}
				else if (containInputChildren == false && $i_jquery.attr('name') != '') 
				{

					retVal += '<![CDATA[' + $i_jquery.html() + ']]>';
				}
				else 
				{
					//
				}
				break;
			case 'INPUT' : // INPUTタグの場合
				retVal += $i_jquery.val();//$i_jquery.attr('value');
				break;
			// TODO : TEXTAREA
			// TODO : SELECTボックスなど
			default : 
				// それ以外の場合は出力しない。
				break;		
		}

		// 子供の要素を再起的に呼び出す。
		$i_jquery.children().each(function () {
			retVal += Utility.HtmlInputItemToXml($(this));
		})

		retVal += '</' + tag + '>';		
	}
	// else 
	// {
	// 	// 備考の内容など、nameが指定されていないものは、こちらに保存する。
	// 	 retVal += 
	// 	 '<' + $i_jquery[0].tagName + '>' 
	// 	 + $i_jquery.html()
	// 	 + '</' + $i_jquery[0].tagName + '>';
	// }

	return retVal;
}

