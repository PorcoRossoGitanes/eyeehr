/**
 * ユーティリティ
 * @class Utility
 * @remarks 使用するHTMLに下記が必要な点を留意する。 
 * @constructor
 */
 function Utility() {
 }

/**
 * 現在日時(yyyyMMddhhmmss)を取得する。
 * @static
 * @method GetCurrentDateTime
 * @return {String} 現在日時(yyyyMMddhhmmss)
 */
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

/**
 * 現在日(yyyyMMdd)を取得する。
 * @static
 * @method GetCurrentDate
 * @return 現在日(yyyyMMdd)
 */
 Utility.GetCurrentDate  = function ()
 {
 	var retVal = '';

 	var now = new Date();		
 	var yyyy = now.getFullYear().toString();
	var MM = (now.getMonth()+1).toString(); // getMonth() is zero-based
	var dd = now.getDate().toString();
	retVal = yyyy + (MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]);

	return retVal;
}

/** 
 * 最小入力コントロールをXMLに置き換える。
 * @static
 * @method HtmlMinInputItemToXml
 * @param DIV, INPUT(集合で入ってくるかもしれない。）, IMG
 * @remarks  入力最小単位 :=
 *  （備考の場合のみ）XHTML |　→XHTMLに変換して保存する
 *   <div name=“tag”>VALUE</div> |　例）検査名 →<検査名>値</検査>で保存する。
 *   <img name=“test-1” src=“Thumbnail” data-command=“本当のデーター">  例）眼底写真 |　→XHTMLに変換して保存する
 *   <input type=“text” name=“tag” value=“hogehoge">　※ほとんどinputでまかなえるのでそれ以外は無視
 *   TODO : ラジオボタン等はどのように扱うか、未検証である。
 */
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
			var html = $('<div></div>').append($i_jquery.clone()).html();
			retVal += Utility.HtmlToXhtml(html);
			break;
			default : 
			break;
		}

		return retVal;
	}

/**
 * HTMLをXHTMLに変換する。（備考とIMGタグで使用する。）
 * @static
 * @method HtmlToXhtml
 * @param {String} i_html HTML 
 * @return {String} XHTML
 */
 Utility.HtmlToXhtml = function(i_html)
 {
 	var retVal = i_html;
 	retVal = retVal.replace( /(<img.*?)\/?>/g, '$1/>' )
 	retVal = retVal.replace( /(<br.*?)\/?>/g, '$1/>' )
 	return retVal;
 }

/**
 * URLから拡張子を取得する。
 * @static
 * @param {String} url URL
 * @return {String} 拡張子
 */
 Utility.GetExtention = function (url) {
    var ext = url.replace(/\?.*$/, "")          // 拡張子以降のパラメータを除去
                 .replace(/#.*$/, "")           // 拡張子以降のパラメータを除去
                 .replace(/^.*\.(.+)$/, "$1");  // 拡張子部分（最後の.以降）をキャプチャして置換
                 return ext;
             }

/**
 * コレクションを作成する。
 * @static
 * @method CreateCollection
 * @param  i_collectionPath コレクションパス
 */
 Utility.CreateCollection = function (i_collectionPath)
 {
 	const SCRIPT = "/exist/apps/eyeehr/modules/create-collection.xql";
 	console.log('Utility.CreateCollection');

 	var lastIndexOfSlash = i_collectionPath.lastIndexOf('/');

 	if (lastIndexOfSlash >= 0)
 	{
 		var senddata = 
 		"parent-collection=" + i_collectionPath.substring(0, lastIndexOfSlash) + 
 		"&target-collection=" + i_collectionPath.substr(lastIndexOfSlash + 1);
 		$.ajax({
		    url : SCRIPT, // コレクション毎取得する場合
		    async: false, // 同期通信に設定する
		    cache: false,
		    dataType:"xml",
		    data: senddata,
		    error: function(){
		    	alert('コレクションの作成に失敗しました。');
		    },
		    success: function(xml){
		    	console.log(xml);
		    }
		});
 	}
 }

/**
 * XMLを保存する。
 * @static
 * @method SaveXml 
 * @param i_path ファイルパス(URL)
 * @param i_xml XML文字列
 * @param callback コールバック関数
 * @remarks ファイルが存在しない場合は新規保存、既存の場合は編集する。
 */
 Utility.SaveXml = function (i_path, i_xml, callback) 
 {
	// コレクションとファイル名を取得する。
	var collection = i_path.substr(0, i_path.lastIndexOf('/'));
	var file = i_path.substr(i_path.lastIndexOf('/') + 1);

	// 画像をXMLDB上に保存する。
	const Url = '/exist/apps/eyeehr/modules/uploadFileXml.xq';
	$.ajax({
	  	async 	: false, 	// 同期通信
	  	url 	: Url,
	  	type 	:'POST',
	  	cache 	: false,
	  	data 	: 
	  	{ 
	  		type       : 'xml', 
	  		collection : collection,
	  		filename   : file,
	  		xml        : i_xml
	  	},
	  	success: function(data) {

			// DB保存成功時は、URLを取得する。
			var url = $(data).find('#url').text();

		 	// 完了メッセージを表示する。
		 	alert('ファイルの保存が完了しました。');

		 	// コールバック関数があれば、コールバック関数を実行する。
		 	if(callback !== undefined) callback(); 

		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) 
		 {
		 	alert('ファイルの保存に失敗しました。: ' + XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
		 	console.log(i_xml);
		 },
		// complete : function(data) 
		// {
		// 	console.log('画像をXMLDBに保存する処理が完了した。');
		//     //alert("finishi");
		// }
	});
}

/**
 * XMLを読込む。
 * @static
 * @method LoadXml
 * @param i_type 
 * 				REST...RESTful
 * 				GET...GET送信
 *              POST...POST送信
 *  @param i_senddata 送信データ
 *  	GET時　	URL?以降のGETパラメータ　例）"param1=aaa&param2=bbb"
 *  	POST時　	POSTパラメータ(JSON形式）　例）{"page": 2}
 * @param i_path ファイルパス(URL) 
 * @remarks ファイルが存在しない場合は新規保存、既存の場合は編集する。
 */
 Utility.LoadXml = function (i_type, i_path, i_senddata, callback) 
 {
	// パスが設定されている場合のみ実行する。
	if (i_path != '')
	{
		// RESTfulの場合は"/exist/rest"を先頭に追加する。
		var url = (i_type == 'REST') ? '/exist/rest' + i_path : i_path;

		if (i_type == 'POST')
		{
			// TODO : POST送信失敗
			$.ajax({
			  	async 	: false, 	// 同期通信
			  	url 	: url,
			  	type 	: 'POST',
				data    : i_senddata,
			    dataType: "xml",
				cache 	: false,
				success: function(data) {
					if(callback !== undefined) callback(data.children);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) 
				{
					alert(
						'XMLデータの読込みに失敗しました。\n' + 
						'URL=' + url + ' \n' +
						'XMLHttpRequest状態=' + XMLHttpRequest.status + ' \n' + 
						'テキストステータス='   + textStatus + ' \n' + 
						'エラーメッセージ=' + errorThrown.message
						);
		     	}//,
				// complete : function(data) 
				// {
				// 	//console.log('ファイルの読み込みが完了しました。');
				// }
			});
		}
		else if (i_type == 'REST' || i_type == 'GET')
		{
			$.ajax({
			    url : url, // コレクション毎取得する場合
			    async: false, // 同期通信に設定する
			    cache: false,
			    dataType:"xml",
			    data: i_senddata,
			    success: function(data){
			    	// data = #document
			    	// data.children = ルートノードオブジェクト 
			        if (callback !== undefined) callback(data.children);
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) 
			    {
			    	alert(
			    		'XMLデータの読込みに失敗しました。\n' + 
			    		'URL=' + url + ' \n' +
			    		'XMLHttpRequest状態=' + XMLHttpRequest.status + ' \n' + 
			    		'テキストステータス='   + textStatus + ' \n' + 
			    		'エラーメッセージ=' + errorThrown.message
			    		);
		     	}//,
		     });
		}
	}
	else 
	{
		alert('送信先URLが設定されていません。');
	}
}

/** 
 * 画像からBase64に変換する
 * @static
 * @method ConvertImgToBase64
 * @param  {String}   URL
 * @param  {String}   [outputFormat='image/png'] 出力フォーマット
 * @param  {Function} callback　コールバック関数
 * @remarks 画像形式
 *  PNG 	image/png
 *  JPEG	image/jpeg
 *  （使用不可）svg	image/svg
 *  （使用不可）bmp	image/bmp?
 * @example Utility.ConvertImgToBase64('http://goo.gl/AOxHAL', 'image/png', function(base64Img){console.log('IMAGE:',base64Img);})
 */
 Utility.ConvertImgToBase64 = function (url, outputFormat, callback)
 {
 	var canvas = document.createElement('CANVAS');
 	var ctx = canvas.getContext('2d');
 	var img = new Image;
 	img.crossOrigin = 'Anonymous';
 	img.onload = function(){
 		canvas.height = img.height;
 		canvas.width = img.width;
 		ctx.drawImage(img,0,0);
 		var dataURL = canvas.toDataURL(outputFormat);
 		callback.call(this, dataURL);
 		canvas = null; 
 	};
 	img.src = url;
 }

/** 
 * JQueryObjectからXML(HTML)文字列を取得する。
 * @static
 * @method InnerHtml
 * @param {JQueryObject} 対象のJQueryオブジェクト
 * @return {String} XML文字列(HTML文字列)
 */
 Utility.InnerXml = function ($i_jquery) 
 {

 	var ret = Utility.XmlToStr($i_jquery[0]);

	// タグを排除する。
	var startIndex = ret.indexOf('>') + 1; var lastIndex = ret.lastIndexOf('<');
	ret = ret.slice(startIndex, lastIndex);

	return ret;
}

/**
 * JQueryオブジェクトからXML文字列(または、HTML文字列)を取得する。
 * @static
 * @method JQueryToStr
 * @param {JQueryObject} 対象のJQueryオブジェクト
 * @return {String} XML文字列(または、HTML文字列)
 */
 Utility.JQueryToStr = function ($i_jquery) 
 {
 	return Utility.XmlToStr($i_jquery[0]);
 }

/**
 * XML Node(Element)からXML文字列(または、HTML文字列)を取得する。
 * @static
 * @method XmlToStr
 * @param  {Element} i_xmlNode XMLNode
 * @return {String} XML文字列(または、HTML文字列)
 */
 Utility.XmlToStr = function (i_xmlNode) 
 {

 	var ret = '';

 	try 
 	{
		// IE以外の場合は、下記を処理する。
		ret = (new XMLSerializer()).serializeToString(i_xmlNode);	
	}
	catch (e) 
	{
		// IEの場合は、下記を処理する。
		try 
		{
			ret =  xmlNode.xml;
		}
		catch (e)
		{
			console.log('XmlSerializer はサポートされていません。');
		}
	}

	return ret;
}


