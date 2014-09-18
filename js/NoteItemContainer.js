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
function NoteItemContainerComplaint ()
{
	///@param クラス名
	this.name = 'NoteItemContainerComplaint';
	NoteItemContainer.call(this, 'NoteItemContainerComplaint', '主訴');
	
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





