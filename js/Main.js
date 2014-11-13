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
	//----- 初期ロード時処理 -----------------------------------------------------
	// ■コンテナを生成する。
	var note = new Note();

	//----- スタンプを自動生成する。 -----------------------------------------------
	var stampListArray = {
	  'PRACTICE'        : '',//'div.stamp_list#practice'         //Practice        => "001"    # 診療行為
	  'INJECTION'       : 'div.stamp_list#injection',        //Practice/300    => "001-300"  # 注射(300番台)
	  'TREATMENT'       : 'div.stamp_list#treatment',        //Practice/400    => "001-400"    # 処置(400番台)
	  'OPERATION'       : 'div.stamp_list#operation',        //Practice/500    => "001-500"  # 手術(500番台)
	  'MEDICAL_CHECK'   : 'div.stamp_list#medical_check',    //Practice/600    => "001-600"  # 検査(600番台)
	  'MEDICAL_PRODUCT' : 'div.stamp_list#medical_product',  //Medical_Product   => "002"    # 医薬品
	  'MACHINE'         : 'div.stamp_list#machine',          //Machine       => "003"    # 特定機材
	  "COMMENT"         : '',//'div.stamp_list#comment',          //Comment       => "006"    # コメント
	  "PRIVATE_EXPENSE" : '',//'div.stamp_list#private_expense'  //Private_Expense   => "007"    # 自費診療
	}
	
	for (var key in stampListArray) {
	
		var selector = stampListArray[key];
		if (selector != '') {
			Stamp.LoadXml(key, function($result){ 
				CreateStamp(selector, $result.children());
			});
		}
	}
	/// @param スタンプを生成する。
	/// @param i_selector スタンプの張付先
	/// @param i_stamps スタンプリスト(XML)
	function CreateStamp (i_selector, $i_stamps)
	{
		// 貼付先を取得する。
		$stampList = $(i_selector);
		// XMLデーターをもとにボタンを貼付ける。
		$i_stamps.each(function (){
			var stamp = new Stamp(); 
			stamp.setByXml($(this)); 
			$stampList.append(stamp.getJQueryObject());
		});
	}
	
	//----- アコーディオンメニューを作成する。 --------------------------------------
	$( '#NoteItemMenu' ).accordion({heightStyle : "fill", active : 1});

	//----- イベント登録 -----
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
	//----- イベント登録 -----
});
//----- ロード時、処理 -----

