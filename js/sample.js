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
		console.log($('td#note').children());
	});

	// 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// 「付箋保存」ボタンを押下時、付箋のテキストを更新する。
	$('input#fix').click(function () 
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
	Utility.HtmlToXml($('<input name="tag" type="text" value="testtext"/>'));

});

///@summary コンストラクタ
function Utility() {
}

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）例:input,textarea,select ...等
Utility.HtmlToXml = function($i_jquery)
{
	var retVal = '';

	// name属性をタグとして使用する。
	var tag = $i_jquery.attr('name');
	// 内部文字列（数値など）を登録する。
	var innerText = '';

	// XMLを生成する。
	if(tag != '')
	{
		switch ($i_jquery[0].tagName)
		{
			case 'DIV' :  // DIVタグの場合
				innerText = $i_jquery.html();
			case 'INPUT' : // INPUTタグの場合
				innerText = $i_jquery.attr('value');
				break;
			// TODO : SELECTボックスなど
			default : 
				// それ以外の場合は出力しない。
				break;		
		}

		retVal += '<' + tag + '>';
		retVal += innerText;
		retVal += '</' + tag + '>';		
	}

	console.log('Utility.HtmlToXml : ' + retVal);
	return retVal;
}

