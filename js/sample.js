//@param 入力パネルインスタンス
var area = null;

//@param 現在の付箋

// @summary nicEditの呼び込み時、入力欄を追加する。
bkLib.onDomLoaded(function() {
  area = new nicEditor({buttonList:[
  	'bold','italic','underline'/*,'image','upload'*/
  ]}).panelInstance('area1');
});

$(function() 
{
	// TODO : テスト呼出し
	XmlManager.SaveNote(
		'/db/sample/test3.xml', 
		'<note3></note3>'
	);

	// 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function(){
		//alert($('td#note').children().html());
		//console.log($('td#note').children());
		//var xml = Utility.HtmlInputItemToXml($('td#note').children());
		//console.log(xml);
		// （デモ）処方箋をXMLに変更する。
		var xml = '';
		$('#NoteItemContainerPrescription > .NoteItem').each(function(){
			var xml = Utility.HtmlInputItemToXml($(this));
		})
	    console.log('Utility.HtmlInputItemToXml : ' + xml);

		//Utility.HtmlInputItemToXml($('<input name="tag" type="text" value="testtext"/>'));

	});

	// 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// 「付箋保存」ボタンを押下時、付箋のテキストを更新する。
	$('button#fix').click(function () 
	{
		var memo = area.instanceById('area1').getContent();
		var rootSelector = 'div#'+ $('input#selectedNoteItem').val();
		NoteItem.ChangeVal($(rootSelector), memo);
	});

	//■コンテナを生成する。
	var containerComplaint = new NoteItemContainerComplaint();
	$('#note').append(containerComplaint.getJQueryObject());
	var containerDisease = new NoteItemContainerDisease();
	$('#note').append(containerDisease.getJQueryObject());
	var containerMedicalCheck = new NoteItemContainerMedicalCheck();
	$('#note').append(containerMedicalCheck.getJQueryObject());
	var containerPrescription = new NoteItemContainerPrescription();
	$('#note').append(containerPrescription.getJQueryObject());
	var containerOperation = new NoteItemContainerOperation();
	$('#note').append(containerOperation.getJQueryObject());
	var containerMemo = new NoteItemContainerMemo();
	$('#note').append(containerMemo.getJQueryObject());
	var containerScheme = new NoteItemContainerScheme();
	$('#note').append(containerScheme.getJQueryObject());


	// ■初回起動時、主訴欄を生成する。
	//new NoteItemComplaint('本日の主訴を入力してください。');

});

///@summary コンストラクタ
function Utility() {
}

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
Utility.HtmlInputItemToXml = function($i_jquery)
{
	var retVal = '';
	//const childElementTags = {'DIV', 'INPUT', 'textarea', 'SELECT'};

	//console.log($i_jquery);

	// name属性をタグとして使用する。
	var tag = $i_jquery.attr('name');

	// XMLを生成する。
	if(tag !== undefined)
	{
		retVal += '<' + tag + '>';
	
		// 子供を持っている場合は再起的にXMLを生成する。
		var hasChildren = $i_jquery.children(
			'DIV', 
			'INPUT', 
			'TEXTAREA', 
			'SELECT'
		).length > 0;

		// 内部文字列を取得する
		switch ($i_jquery[0].tagName)
		{
			case 'DIV' :  // DIVタグの場合
				console.log($i_jquery.children().length);
				if(hasChildren == false) retVal += $i_jquery.html();
				break;
			case 'INPUT' : // INPUTタグの場合
				retVal += $i_jquery.attr('value');
				break;
			// TODO : TEXTAREA
			// TODO : SELECTボックスなど
			default : 
				console.log($i_jquery[0].tagName);
				// それ以外の場合は出力しない。
				break;		
		}

		// 子供の要素を再起的に呼び出す。
		$i_jquery.children().each(function () {
			retVal += Utility.HtmlInputItemToXml($(this));
		})

		retVal += '</' + tag + '>';		
	}

	if (tag == 'medicine') 
	{
		alert(retVal + '/' + $i_jquery.find().length);
		console.log($i_jquery);
	}

	console.log(retVal);
	return retVal;
}

