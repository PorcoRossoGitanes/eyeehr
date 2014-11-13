///@summary スタンプ

function Stamp() {
};(function() {

	///@param クラス名
	this._name = 'Stamp';

    ///@param [保存先]コレクション
    // this._collection = '/db/apps/eyeehr/data/Stamp';

    ///@param [保存先]ファイル名
    //this._filename =  this._name + Utility.GetCurrentDate() + '.xml';

    ///@param [保存先]URL
    //this._url = this._collection + this._filename;

	// JQuery オブジェクト
	$jquery = $('<button type="button" class="btn btn-default btn-xs" >ベストロン点眼用0.5%</button>');
	
	$jquery.click(function () {
		var item = new NoteItemPrescription(); 
		item.setFormats('ベストロン点眼用0.5%');
		item.appendTo('[name=NoteItemContainerPrescription]');	
	});

	// プロトタイプ
	var _proto = Staff.prototype;

	/// @summary クラス名を取得する。
	_proto.getName = function() {
	  return this._name;
	};

	/// @summary クラス名を設定する。
	_proto.setName = function(name) {
	  this._name = name;
	};

	//<Stamp>
	// <Orca>
	// <Medical_Class>400</Medical_Class>
	// <Medication_Code>140000190</Medication_Code>
	// <Medication_Name>時間外加算２（イに該当を除く）（処置）</Medication_Name>
	// <Medication_Number>1</Medication_Number>
	// <Medication_Generic_Flg>yes</Medication_Generic_Flg>
	// <Medication_Unit_Point>000000040.00</Medication_Unit_Point>
	// <Medication_Unit/>
	// </Orca>
	// <Eyeehr></Eyeehr>
	// </Stamp>
})();

/// @summary 対象のスタンプを取得する。
///    @file loadStamp.xq
/// @param 	i_target = 検索対象（下記参照）
/// 		"PRACTICE" 			Practice 			=> "001" 		# 診療行為
/// 		"INJECTION" 		Practice/300		=> "001-300" 	# 注射(300番台)
/// 		"TREATMENT" 		Practice/400		=> "001-400"  	# 処置(400番台)
/// 		"OPERATION" 		Practice/500		=> "001-500"	# 手術(500番台)
/// 		"MEDICAL_CHECK" 	Practice/600		=> "001-600"	# 検査(600番台)
/// 		"MEDICAL_PRODUCT" 	Medical_Product 	=> "002" 		# 医薬品
/// 		"MACHINE" 			Machine 			=> "003" 		# 特定機材
/// 		"COMMENT" 			Comment 			=> "006" 		# コメント
/// 		"PRIVATE_EXPENSE" 	Privete_Expense		=> "007"		# 自費診療
/// @param callback コールバック関数
/// @return 成功時、指定のスタンプ一覧が返却される。失敗時、スタンプが返却されない。
/// 出力例)
///<Stamp>
///<Orca>
///<Medical_Class/>
///<Medication_Code>096000001</Medication_Code>
///<Medication_Name>文書料</Medication_Name>
///<Medication_Number>1</Medication_Number>
///<Medication_Generic_Flg>yes</Medication_Generic_Flg>
///<Medication_Unit_Point>000003240.00</Medication_Unit_Point>
///<Medication_Unit/>
///</Orca>
///<Eyeehr>
///</Eyeehr>
///</Stamp>
///<Stamp>...</Stamp>
///<Stamp>...</Stamp>
Stamp.LoadXml = function (i_target, callback)
{
	const SCRIPT = '/exist/apps/eyeehr/modules/loadStamp.xq';
	var senddata = "target=" + i_target;
	$.ajax({
	    url : SCRIPT, // コレクション毎取得する場合
	    async: false, // 同期通信に設定する
	    cache: false,
	    dataType:"xml",
	    data: senddata,
	    error: function(){
	        alert('スタンプの読込みに失敗しました。');
	    },
	    success: function(xml){
	        if (callback !== undefined)  callback($(xml).contents().children());
	    }
	});
}