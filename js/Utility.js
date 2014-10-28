///@summary コンストラクタ
///@remarks 使用するHTMLに下記が必要な点を留意する。 
/// <div id="utility" style="display:none"></div><!--ユーティリティで使用-->
function Utility() {
}

///@summary 現在日時(yyyyMMddhhmmss)を取得する。
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
		yyyy + (MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) 
		 + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);

	return retVal;
}

///@summary 現在日(yyyyMMdd)を取得する。
Utility.GetCurrentDate  = function ()
{
	var retVal = '';
 
    var now = new Date();		
	var yyyy = now.getFullYear().toString();
	var MM = (now.getMonth()+1).toString(); // getMonth() is zero-based
	var dd = now.getDate().toString();
	// var hh = now.getHours().toString();
	// var mm = now.getMinutes().toString();
 //    var ss = now.getSeconds().toString();
	retVal = 
		yyyy + (MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]);
		 // + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);

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

	switch ($i_jquery[0].tagName)
	{
		case 'DIV':
			if($i_jquery.attr('name') !== undefined)
			{
				var tag = $i_jquery.attr('name');
				retVal += '<' +  tag + '>';
				retVal += $i_jquery.text();
				retVal += '</' + tag + '>';
			}
			break;
		case 'INPUT':
			if($i_jquery.attr('name') !== undefined)
			{
				var tag = $i_jquery.attr('name');
				retVal += '<' +  tag + '>';
				retVal += $i_jquery.val();
				retVal += '</' + tag + '>';
			}
			break;
		case 'IMG':
			// XHTMLに変換する。（一度、親要素に配置しなければ、HTML文字列が取得できない。）
			$utility = $('div#utility');
			$utility.css('display', 'none');
			$utility.children().remove();
			var html = $('div#utility').append($i_jquery.clone()).html();
			retVal += Utility.HtmlToXhtml(html);
			break;
		default : 
			break;
	}

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

/// @summary	URLから拡張子を取得する。
/// @param 	url URL
/// @returns 拡張子
Utility.GetExtention = function (url) {
    var ext = url.replace(/\?.*$/, "")          // 拡張子以降のパラメータを除去
                 .replace(/#.*$/, "")           // 拡張子以降のパラメータを除去
                 .replace(/^.*\.(.+)$/, "$1");  // 拡張子部分（最後の.以降）をキャプチャして置換
    return ext;
}

Utility.CreateCollection = function (i_collectionPath)
{
	var term = line.split( ',' );
	$.ajax({
	    url : "/exist/apps/eyeehr/modules/create-collection.xql", // コレクション毎取得する場合
	    async: false, // 雨期通信に設定する
	    cache: false,
	    dataType:"xml",
	    data: "parent-collection=/db&target-collection=func",
	    error: function(){
	        alert('コレクションの作成に失敗しました。');
	    },
	    success: function(xml){
	        console.log(xml);
	    }
	});

}

