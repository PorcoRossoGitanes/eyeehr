
//----- Method Draw ------
/**
 * シェーマを追加する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function AttachScheme (i_noteItemId, i_url, callback)
{
	NoteItem.AttachScheme(i_noteItemId, i_url, callback);
}

/**
 * 備考を変更する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
function ChangeRemark (i_noteItemId, i_content, callback)
{
	NoteItem.ChangeRemark(i_noteItemId, i_content, callback);
}
//----- Method Draw ------
//----- ロード時、処理 -----
$(function() 
{
	//----- 初期ロード時処理 -----------------------------------------------------
	// ■コンテナを生成する。
	var note = new Note();

	//----- スタンプを自動生成する。 -----------------------------------------------
	const StampListSetting = {
		'Stamp' : [
	{'key' : 'DISEASE'			,'selector' : 'div.stamp_list#disease'					, 'class' : 'StampDisease'		    /*Disease => "" # 病名・所見*/                  	},
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
		Stamp.LoadXml(key, function(result){ 
				//result[0]がルートノードとなる。
				//console.log(result[0].children); 
				CreateStamp(key, selector, result[0].children);
			});
	}
}
	/** 
	 * スタンプを生成する。
	 * @param {String} i_key キー
	 * @param {String} i_selector スタンプの張付先(JQueryセレクタ)
	 * @param {XmlDocument} i_stampsXml スタンプリスト(XML)
	 */
	 function CreateStamp (i_key, i_selector, i_stampsXml)
	 {
		//console.log(i_stampsXml);
		
		// 貼付先を取得する。
		$stampList = $(i_selector);

		// XMLデーターをもとにボタンを貼付ける。
		//console.log(i_stampsXml);
		for (var index = 0; index < i_stampsXml.length; index++)
		{
			var stamp = null;
			//var stampXml = i_stampsXml[index];			
			//console.log(stampXml);

			switch (i_key)
			{
				case 'DISEASE'      	: stamp = new StampDisease(); 			break;
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
			
			stamp.setByXml(Utility.XmlToStr(i_stampsXml[index])); 
			$stampList.append(stamp.getJQueryObject());
		};
	}

	$('#MenuLeft').css('left', 0);
	$('#MenuLeft').css('top', 0);
	$('#MenuRight').css('left', parseFloat($(window).width()) - parseFloat($('#MenuRight').width()));
	console.log(parseFloat($('#MenuRight').width()));
	$('#MenuRight').css('top', -parseFloat($('#MenuLeft').css('height')));

	console.log($(window).width());
	$(window).scroll(function(){

		var scrollTop = parseInt($(this).scrollTop());

		$('#MenuLeft').css('top', scrollTop);
		$('#MenuRight').css('top', scrollTop - parseFloat($('#MenuLeft').css('height')));

		// console.log(scrollTop);
		// console.log($('[name="Note"]').css('top'));
		// console.log($('#MenuRight').css('top'));	

		$('#MenuLeft').animate(
			{top:scrollTop},
			{
				duration:800,
				queue:false,
				easing:"easeOutCubic", 
			}
			);

		// $('#MenuRight').animate(
		// 	{top : (scrollTop)},
		// 	{
		// 		duration:800,
		// 		queue:false,
		// 		easing:"easeOutCubic"
		// 	}
		// );
});

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

