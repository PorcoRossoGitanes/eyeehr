///@summary スタッフ
function Staff() {
};(function() {

	///@param クラス名
	this._name = 'Staff';

    ///@param [保存先]コレクション
    this._collection = '/db/apps/eyeehr/data/staff/';

    ///@param [保存先]ファイル名
    this._filename =  this._name + Utility.GetCurrentDate() + '.xml';

    ///@param [保存先]URL
    this._url = this._collection + this._filename;

    ///@param カルテ
	$currentStaff = $('<div name="' + this._name + '"></div>');

	// // カルテを空にする。
	// $currentNote.empty();

	// // URLをDATA[url]に格納する。
	// $currentNote.attr('data-url', this._url);


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
})();

Staff.LoadXml = function ()
{
	var url = '/db/apps/eyeehr/data/staff/' + 'staff-1.xml';
	Utility.LoadXml('REST', url, '', function($xml){console.log($xml.children()/*$xml.find('staff')*/);})
}