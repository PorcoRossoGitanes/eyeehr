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
});


