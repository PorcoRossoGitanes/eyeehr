///@summary コンストラクタ
///@param 	i_name	名前
///@param 	i_title	タイトル
function NoteItemContainer (i_name, i_title)
{
	///@param クラス名
	this.name = 'NoteItemContainer';
		
	///@param HTML
	$jquery = $('<div ' + 
		'class="' + 'NoteItemContainer' + '" ' + 
		'name="' + i_name + '">' + 
		'<h1>' + i_title + '</h1>' + 
		//'<div id="attached"></div>' + 
	'</div>');
	$jquery.draggable();

	///@summary HTMLを出力する
	///@return HTML
	this.getJQueryObject = function () 
	{
		return $jquery;
	}

	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}

/// @summary 	付箋コンテナHTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return 	保存用XML
NoteItemContainer.HtmlToXml = function($i_jquery)
{
	var retVal = '';

	var tag = $i_jquery.attr('name');

	retVal += '<' + tag + '>';
	// TODO ヘッダー情報を記入する。

	// 子要素のXMLを取得しにいく。
	$i_jquery.children('div.NoteItem').each(function () {
		retVal += NoteItem.HtmlToXml($(this));
	})

	retVal += '</' + tag + '>';

	return retVal;
}

//--------------------------------------------------//
///@summary カルテ項目コンテナ（所見（病名））
function NoteItemContainerDisease ()
{
	///@param クラス名
	this.name = 'NoteItemContainerDisease';
	NoteItemContainer.call(this, 'NoteItemContainerDisease', '病名');

	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerDisease.prototype = new NoteItemContainer;

//--------------------------------------------------//

///@summary カルテ項目コンテナ（主訴）
function NoteItemContainerComplaint ($i_xml)
{
	///@param クラス名
	this.name = 'NoteItemContainerComplaint';
	NoteItemContainer.call(this, this.name, '主訴');

	// 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
	if ($i_xml !== undefined)
	{
		if ($i_xml[0].tagName == this.name.toUpperCase())
		{
            $i_xml[0].children().each(function(){
	            var item = new NoteItemComplaint($(this)); 
	            //console.log($(this));
	            item.appendTo('[name=' + this.name +']');
	        });

		}
		// console.log(arguments.length);
		// console.log($i_xml);
	}
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerComplaint.prototype = new NoteItemContainer;


//--------------------------------------------------//

///@summary カルテ項目コンテナ（検査）
function NoteItemContainerMedicalCheck ()
{
	///@param クラス名
	this.name = 'NoteItemContainerMedicalCheck';
	NoteItemContainer.call(this, 'NoteItemContainerMedicalCheck', '検査');
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerMedicalCheck.prototype = new NoteItemContainer;

//--------------------------------------------------//

///@summary カルテ項目コンテナ（処方）
function NoteItemContainerPrescription ()
{
	///@param クラス名
	this.name = 'NoteItemContainerPrescription';
	NoteItemContainer.call(this, 'NoteItemContainerPrescription', '処方');
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerPrescription.prototype = new NoteItemContainer;


//--------------------------------------------------//

///@summary カルテ項目コンテナ（手術）
function NoteItemContainerOperation ()
{
	///@param クラス名
	this.name = 'NoteItemContainerOperation';
	NoteItemContainer.call(this, 'NoteItemContainerOperation', '手術');
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerOperation.prototype = new NoteItemContainer;

//--------------------------------------------------//
///@summary カルテ項目コンテナ（メモ）
function NoteItemContainerMemo ()
{
	///@param クラス名
	this.name = 'NoteItemContainerMemo';
	NoteItemContainer.call(this, 'NoteItemContainerMemo', 'メモ');
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerMemo.prototype = new NoteItemContainer;

//--------------------------------------------------//
///@summary カルテ項目コンテナ（シェーマ）
function NoteItemContainerScheme ()
{
	///@param クラス名
	this.name = 'NoteItemContainerScheme';
	NoteItemContainer.call(this, 'NoteItemContainerScheme', 'シェーマ');
	
	///@summary クラス名を取得する。
	///@returns クラス名
	this.getName = function() 
	{
		return this.name;
	};
}
NoteItemContainerScheme.prototype = new NoteItemContainer;





