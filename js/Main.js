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
		var filePath = $('input#currentFilePath').val();

		Utility.LoadXml(filePath, Note.LoadXml);
		//XmlManager.LoadNote(filePath);
	});

	/// @summary 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function(){

	    //console.log('Utility.HtmlInputItemToXml : ' + xml);

   		// カルテを保存する。
   		Note.SaveXml();
		// XmlManager.SaveNote(filePath, xml);

		// TODO : 現在のカルテファイルパスを表示する。
		$('input#currentFilePath').val($currentNote.data('url'));
	});

	// @summary 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

		// 担当者情報を読み取る。
	$('button#loadXmlFromOrca').click(function(){
		Stamp.LoadXml();
		// //Patient.LoadXmlFromOrca();
		// 		// 画像をXMLDB上に保存する。
	 //    var url = 'http://ormaster:ormaster123@192.168.24.117:8000/api01rv2/patientgetv2'+ '?id=1233';
	 //    var user = 'ormaster';
	 //    var pswd = 'ormaster123';
	 //    //console.log(url);

		// $.ajax({
		//   	async 	: false, 	// 同期通信
		//   	url 	: url,
		//   	type 	:'GET',
		//   	cache 	: false,
		//  //  	data    : {id: '1233'}, 
	 //  // 		beforeSend: function(xhr) {
		// 	// 	var credentials = $.base64.encode(user + ':' + pswd);
		// 	//     xhr.setRequestHeader ("Authorization", "Basic " + credentials); 
		// 	//     //xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ':' + pswd)/*credentials*/);
		// 	// },
		// 	success: function(data) {
		// 		alert(data);
		// 		//if(callback !== undefined) callback($(data)); 
	 //     	},
	 //      	error: function(XMLHttpRequest, textStatus, errorThrown) 
	 //      	{
	 //      		alert('読込みに失敗しました。: ' + XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
	 //        	// $("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
	 //        	// $("#textStatus").html("textStatus : " + textStatus);
	 //        	// $("#errorThrown").html("errorThrown : " + errorThrown.message);
	 //     	}
	 //     	//,
		// 	// complete : function(data) 
		// 	// {
		// 	// }
		// });
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

	// アコーディオンメニューを作成する。
	$( '#NoteItemMenu' ).accordion({heightStyle : "fill", active : 1});

	//■コンテナを生成する。
	var note = new Note();


	// ■初回起動時、主訴欄を生成する。
	//new NoteItemComplaint('本日の主訴を入力してください。');


});

