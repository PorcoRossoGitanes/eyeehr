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
Utility.HtmlNoteToXml = function($i_jquery)/* $('#note')*/
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




/// @summary  最小入力コントロールをXMLに置き換える。
/// @param DIV, INPUT(集合で入ってくるかもしれない。）, IMG
/// @remarks  入力最小単位 :=
/// （備考の場合のみ）XHTML |　→XHTMLに変換して保存する
///  <div name=“tag”>VALUE</div> |　例）検査名 →<検査名>値</検査>で保存する。
///  <img name=“test-1” src=“Thumbnail” data-command=“本当のデーター">  例）眼底写真 |　→XHTMLに変換して保存する
///  <input type=“text” name=“tag” value=“hogehoge">　※ほとんどinputでまかなえるのでそれ以外は無視
/// TODO : ラジオボタン等はどのように扱うか、未検証である。
Utility.HtmlMinInputItemToXml = function($i_jquery)
{
	var retVal = '';

	// 入力タグとなりうる要素を取得する。
	//$i_jquery.find('DIV', 'INPUT', 'IMG').each(function (){
	if($i_jquery.attr('name') !== undefined)
	{
		var tag = $i_jquery.attr('name');

		switch ($i_jquery[0].tagName)
		{
			case 'DIV':
				retVal += '<' +  tag + '>';
				retVal += $i_jquery.text();
				retVal += '</' + tag + '>';
				break;
			case 'INPUT':
				retVal += '<' +  tag + '>';
				retVal += $i_jquery.val();
				retVal += '</' + tag + '>';
				break;
			case 'IMG':
				// XHTMLに変換する。
				retVal += Utility.HtmlToXhtml($(this).html()); 
				break;
			default : 
				break;
		}
	}
	//})

	return retVal;
}

/// @summary 	HTMLをXHTMLに変換する。（備考とIMGタグで使用する。）
/// @param		HTML 
Utility.HtmlToXhtml = function(i_html)
{
	var retVal = i_html;
	retVal = retVal.replace( /(<img.*?)\/?>/g, '$1/>' )
	retVal = retVal.replace( /(<br.*?)\/?>/g, '$1/>' )
	return retVal;
}

