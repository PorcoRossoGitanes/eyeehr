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
	const StampListSetting = {
	  "Stamp" : [
	  	{'key' : 'PRACTICE'			,'selector' : ''/*'div.stamp_list#practice'*/			, 'class' : ''				        /*Practice => "001" # 診療行為*/                  	},
	  	{'key' : 'INJECTION'		,'selector' : 'div.stamp_list#injection'				, 'class' : 'StampInjection'		/*Practice/300    => "001-300"  # 注射(300番台)*/		},
	  	{'key' : 'TREATMENT'		,'selector' : 'div.stamp_list#treatment'				, 'class' : 'StampTreatment'       	/*Practice/400    => "001-400"    # 処置(400番台)*/	},
	  	{'key' : 'OPERATION'		,'selector' : 'div.stamp_list#operation'				, 'class' : 'StampOperation'      	/*Practice/500    => "001-500"  # 手術(500番台)*/		},
	  	{'key' : 'MEDICAL_CHECK'	,'selector' : 'div.stamp_list#medical_check'			, 'class' : 'StampMedicalCheck'    	/*Practice/600    => "001-600"  # 検査(600番台)*/		},
	  	{'key' : 'MEDICAL_PRODUCT'	,'selector' : 'div.stamp_list#medical_product'			, 'class' : 'StampMedicalProduct'  	/*Medical_Product   => "002"    # 医薬品*/			},
	  	{'key' : 'MACHINE'			,'selector' : 'div.stamp_list#machine'					, 'class' : 'StampMachine'         	/*Machine       => "003"    # 特定機材*/				},
	  	{'key' : 'COMMENT'			,'selector' : ''/*'div.stamp_list#comment'*/			, 'class' : ''         				/*Comment       => "006"    # コメント*/				},
	  	{'key' : 'PRIVATE_EXPENSE'	,'selector' : ''/*'div.stamp_list#private_expense' */ 	, 'class' : ''						/*Private_Expense   => "007"    # 自費診療*/			}
	  ]	  
	}
	
	for (var i in StampListSetting.Stamp) {
		var key = StampListSetting.Stamp[i].key;
		var selector = StampListSetting.Stamp[i].selector;
		if (selector != '') {
			Stamp.LoadXml(key, function($result){ 
				CreateStamp(key, selector, $result.children());
			});
		}
	}
	/// @param スタンプを生成する。
	/// @param i_key キー
	/// @param i_selector スタンプの張付先
	/// @param i_stamps スタンプリスト(XML)
	function CreateStamp (i_key, i_selector, $i_stamps)
	{
		// 貼付先を取得する。
		$stampList = $(i_selector);
		// XMLデーターをもとにボタンを貼付ける。
		$i_stamps.each(function (){
			var stamp = null;
			switch (i_key)
			{
				case 'PRACTICE'      	: stamp = new Stamp(); 					break;
				case 'INJECTION'     	: stamp = new StampInjection(); 		break;
				case 'TREATMENT'     	: stamp = new StampTreatment();			break;
				case 'OPERATION'     	: stamp = new StampOperation(); 		break;
				case 'MEDICAL_CHECK' 	: stamp = new StampMedicalCheck(); 		break;
				case 'MEDICAL_PRODUCT'	: stamp = new StampMedicalProduct(); 	break;
				case 'MACHINE'			: stamp = new StampMachine();			break;
				case 'COMMENT'			: stamp = new Stamp(); 					break;
				case 'PRIVATE_EXPENSE'	: stamp = new Stamp();					break;
				default 				: stamp = new Stamp(); 					break;
			} 
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

