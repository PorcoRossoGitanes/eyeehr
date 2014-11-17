/**
 * スタンプクラス
 * @class Stamp
 */
function Stamp() {

  /**
   * @param {String}クラス名
   */
  this._name = 'Stamp';

  /**
   * @param {String} ID (ファイル名　拡張子なし)
   */
  this._id = '';

  /**
   *@param {String} スタンプタイトル（正式）
   */
  this._title = 'N/A';

  /**
   * @param {String }スタンプタイトル（略称・表示名）
   */
  this._short_title = this._title;

  /**
   * @param {String} [保存先]URL
   */
  this._url = '';

  /**
   * @param {String} XML文字列
   */
  this._xml = '';

  /*
  * @param {String} XML
  * @static
  */
  arguments.callee.Xml = ''; 

  // ■初期化
  // JQuery オブジェクト
  $jquery = $(
    '<button ' + 
    'type="button" ' + 
    'class="btn btn-default btn-xs"' + 
    ' ></button>'
  );

};(function() {

	// プロトタイプ
	var _proto = Stamp.prototype;

	///@param スタンプタイトル（略称・表示名）の最大長
	const SHORT_TITLE_MAX_LENGTH = 5;

	// ■メンバーメソッド

	/// @summary クラス名を取得する。
	_proto.getName = function() {
		return this._name;
	};

	/// @summary クラス名を設定する。
	_proto.setName = function(name) {
		this._name = name;
	};

	/** 
	 * XMLを設定する。
	 * @param {String} i_xml XML文字列
	 */
	_proto.setByXml = function (i_xml)
	{
		if (i_xml !== undefined)
		{
			this._xml = i_xml;
			console.log(this._xml);
			this._id = $(i_xml).attr('Id');
			this._url = $(i_xml).attr('Url');

			// 正式名称を取得する。
			this._title = $(i_xml).children('Eyeehr').children('Title').text();
			
			// 略称（表示名）を取得する。
			this._short_title = 
				(this._title.length >= SHORT_TITLE_MAX_LENGTH) ?  
				this._title.slice(0, SHORT_TITLE_MAX_LENGTH - 1) + '...' : this._title; 

			var xml =  Utility.JQueryToStr($(i_xml));
			$jquery.attr('id', this._id);
			$jquery.data('url', this._url);
			$jquery.attr('title', this._title);
			//$jquery.data('xml', xml);
			$jquery.text(this._short_title);
			//console.log(this._url);
			//console.log(xml);
		}
	}


	///@summary JQueryObjectを出力する
	///@return JQueryObject
	_proto.getJQueryObject = function () 
	{
	  return $jquery;
	}
})();
   
/// @summary 対象のスタンプを取得する。
///    @file loadStamp.xq
/// @param  i_target = 検索対象（下記参照）
///     "PRACTICE"      Practice      => "001"    # 診療行為
///     "INJECTION"     Practice/300    => "001-300"  # 注射(300番台)
///     "TREATMENT"     Practice/400    => "001-400"    # 処置(400番台)
///     "OPERATION"     Practice/500    => "001-500"  # 手術(500番台)
///     "MEDICAL_CHECK"   Practice/600    => "001-600"  # 検査(600番台)
///     "MEDICAL_PRODUCT"   Medical_Product   => "002"    # 医薬品
///     "MACHINE"       Machine       => "003"    # 特定機材
///     "COMMENT"       Comment       => "006"    # コメント
///     "PRIVATE_EXPENSE"   Private_Expense   => "007"    # 自費診療
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
  Utility.LoadXml('GET', SCRIPT, senddata, callback);
}

