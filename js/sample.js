//@param 入力パネルインスタンス
var area = null;

//@param 現在の付箋

// @summary nicEditの呼び込み時、入力欄を追加する。
bkLib.onDomLoaded(function() {
	const ID = 'area1';
  	
  	area = new nicEditor(
  	{
		buttonList:[
 			'save', // 「保存ボタンを追加した。」
 			'bold',
 			'italic',
 			'underline', 
 			//'forecolor',
 			'forecolor-black',
 			'forecolor-red',
 			'forecolor-blue',
 			'forecolor-green',
 			'forecolor-brown',
 			'forecolor-yellow',
 			'bgcolor',
 			'bgcolor-red'
 			/*,
 			'image',
 			'upload'*/
 		],
		//convertToText:true

		// 「保存」ボタン押下時、付箋の備考を保存する。
		onSave : function(content, id, instance) {			
			// 変更内容を取得する。
			var memo = content;
			
			// 付箋IDを取得する。
			var id = $('input#selectedNoteItem').val();

			// IDが存在すれば、付箋を更新する。
			if (id != '')
			{
				memo = memo.replace(/<div>/g, '<br />');
				memo = memo.replace(/<\/div>/g, '');
				var rootSelector = 'div#' + id;
				NoteItem.ChangeVal($(rootSelector), memo);
			}
  		}
  	}).panelInstance(ID);

  	// // TODO : フォーカスを話したときに自動的に保存する。
  	// area.addEvent('blur', function() {
  	// 	alert('blur');
   //  	area.instanceById(ID).saveContent();
  	// });

});

$(function() 
{
	// console.log($('#menumenu'));
	// // $("#menumenu").menubar({
 // //    	// menuIcon: true,
 // //    	// buttons: true
	// // });

	/// @summary 「新規」ボタンを押下時、カルテを新規作成する。
	$('button#new').click(function(){
		// TODO 未作成
		alert('新規作成');
		//XmlManager.LoadNote($('div#currentFilePath').text());
	});

	/// @summary 「読込」ボタンを押下時、XMLを読込む。
	$('button#load').click(function(){
		
		XmlManager.LoadNote($('div#currentFilePath').text());
	
	});

	/// @summary 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function(){
		// 本日のカルテをXMLに変更する。
		var xml = '';
		$('td[name="note"]').each(function(){
			xml = Note.HtmlNoteToXml($(this));
		})
	    //console.log('Utility.HtmlInputItemToXml : ' + xml);

	    // ディレクトリを取得する。
	    var dir = '/db/sample/';
	    // ディレクトリを取得する。
	    var prefix = 'note';
	    // 拡張子を取得する。
	    var ext = '.xml';
	    // 現在時刻を取得する。
	    var yyyyMMddhhmmss = Utility.GetCurrentDateTime();

   		var filePath = dir + prefix + yyyyMMddhhmmss + '.xml';

   		// 指定のファイルパスにXMLデーターを保存する。
		XmlManager.SaveNote(filePath, xml);

		// TODO : 現在のカルテファイルパスを表示する。
		$('div#currentFilePath').text(filePath);
	});

	// @summary 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// // @summary 「付箋保存」ボタンを押下時、付箋のテキストを更新する。
	// // @remarks 	nicEdit保存ボタンに処理を移行した。
	// $('button#fix').click(function () 
	// {
	// 	// 変更内容を取得する。
	// 	var memo = area.instanceById('area1').getContent();
		
	// 	// 付箋IDを取得する。
	// 	var id = $('input#selectedNoteItem').val();

	// 	// IDが存在すれば、付箋を更新する。
	// 	if (id != '')
	// 	{
	// 		console.log('pre');
	// 		console.log(memo);
	// 		memo = memo.replace(/<div>/g, '<br />');
	// 		memo = memo.replace(/<\/div>/g, '');
	// 		console.log(memo);
	// 		var rootSelector = 'div#' + id;
	// 		NoteItem.ChangeVal($(rootSelector), memo);
	// 	}
	// });

	//■コンテナを生成する。
	$currentNote = $('[name=note]');
	var containerComplaint = new NoteItemContainerComplaint();
	$currentNote.append(containerComplaint.getJQueryObject());
	var containerDisease = new NoteItemContainerDisease();
	$currentNote.append(containerDisease.getJQueryObject());
	var containerMedicalCheck = new NoteItemContainerMedicalCheck();
	$currentNote.append(containerMedicalCheck.getJQueryObject());
	var containerPrescription = new NoteItemContainerPrescription();
	$currentNote.append(containerPrescription.getJQueryObject());
	var containerOperation = new NoteItemContainerOperation();
	$currentNote.append(containerOperation.getJQueryObject());
	var containerMemo = new NoteItemContainerMemo();
	$currentNote.append(containerMemo.getJQueryObject());
	var containerScheme = new NoteItemContainerScheme();
	$currentNote.append(containerScheme.getJQueryObject());


	// ■初回起動時、主訴欄を生成する。
	//new NoteItemComplaint('本日の主訴を入力してください。');

});

