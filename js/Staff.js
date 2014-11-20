/**
 * スタッフ
 * @class Staff
 */
function Staff() {

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


};(function() {

	var _proto = Staff.prototype;

	/**
	 * クラス名（親クラス...現在のクラス）を取得する
	 * @method getName
	 * @return {String} クラス名（親クラス...現在のクラス）
	 */
	_proto.getName = function() {
	  return this._name;
	};
})();

/**
 * 担当者情報(XML)を読み込む
 * @method LoadXml 
 */
Staff.LoadXml = function ()
{
	var url = '/db/apps/eyeehr/data/staff/' + 'staff-1.xml';
	Utility.LoadXml('REST', url, '', function(xml){console.log(($(xml).children())[0]/*$xml.find('staff')*/);})
}