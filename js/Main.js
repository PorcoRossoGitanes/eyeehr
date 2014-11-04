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
 			// 'bgcolor',
 			// 'bgcolor-black',
 			'bgcolor-red',
 			'bgcolor-blue',
 			'bgcolor-green',
 			'bgcolor-brown',
 			'bgcolor-yellow'
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
});

$(function() 
{
	// var noteItem = new NoteItemComplaint();
	// alert(noteItem.getName());

	/// @summary 「新規」ボタンを押下時、カルテを新規作成する。
	$('button#new').click(function(){
		// TODO 未作成
		alert('新規作成');
	});

	/// @summary 「読込」ボタンを押下時、XMLを読込む。
	$('button#load').click(function(){
		XmlManager.LoadNote($('input#currentFilePath').val());
	
	});

	/// @summary 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function(){
		// 本日のカルテをXMLに変更する。
		var xml = '';
		$('td[name="note"]').each(function(){
			xml = Note.HtmlNoteToXml($(this));
		})
	    //console.log('Utility.HtmlInputItemToXml : ' + xml);

	    // 本日(yyMMdd)を取得する。
	    var yyyyMMdd = Utility.GetCurrentDate();
		    //Utility.GetCurrentDateTime();

	    // ディレクトリを取得する。
	    var dir = '/db/apps/eyeehr/data/note/patient-to-10000/patient-00001/' + yyyyMMdd + '/';

	    // ディレクトリを取得する。
	    var prefix = 'note';
	    // 拡張子を取得する。
	    var ext = '.xml';

   		var filePath = dir + prefix + yyyyMMdd + '.xml';

   		// 指定のファイルパスにXMLデーターを保存する。
		Utility.SaveXml(filePath, xml); 
  		 alert(xml);
		// XmlManager.SaveNote(filePath, xml);

		// TODO : 現在のカルテファイルパスを表示する。
		$('input#currentFilePath').val(filePath);
	});

	// @summary 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// 担当者情報を読み取る。
	$('#loadStaff').click(function(){
		$.ajax({
		    //url: "/exist/rest/apps/eyeehr/data/staff/staff-1.xml",
		    url : "/exist/rest/apps/eyeehr/data/staff?_query=/staff", // コレクション毎取得する場合
		    async: true,
		    cache: false,
		    dataType:"xml",
		    error: function(){
		        alert('Error loading XML document');
		    },
		    success: function(xml){
		        console.log(xml);
		    }
		});
		
	})

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

	// アコーディオンメニューを作成する。
	$( '#NoteItemMenu' ).accordion({heightStyle : "fill", active : 1});

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

