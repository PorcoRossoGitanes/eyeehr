//----- nicEdit -----
//@param 入力パネルインスタンス
var area = null;

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
//----- nicEdit -----

//----- ロード時、処理 -----
$(function() 
{
	/// @summary 「新規」ボタンを押下時、カルテを新規作成する。
	$('button#new').click(function(){
		alert('新規作成');		// TODO 未作成
	});

	/// @summary 「読込」ボタンを押下時、XMLを読込む。
	$('button#load').click(function(){
		var filePath = $('input#currentFilePath').val();
		Utility.LoadXml('REST', filePath, '', Note.LoadXml);
	});

	/// @summary 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function()
	{
   		// カルテを保存する。
   		Note.SaveXml();
		// TODO : 現在のカルテファイルパスを表示する。
		$('input#currentFilePath').val($currentNote.data('url'));
	});

	// @summary 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// アコーディオンメニューを作成する。
	$( '#NoteItemMenu' ).accordion({heightStyle : "fill", active : 1});

	//■コンテナを生成する。
	var note = new Note();
});
//----- ロード時、処理 -----

