/**
 * メモスタンプリストクラス　
 * @class StampListMemo
 * @constructor
 */
var StampListMemo = function () {

    StampList.call(this, true, false);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListMemo.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = 'メモ';

    //--JQuery オブジェクト操作---//
    $(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//
    
    if(this._hasOne) 
    {
        $(this._head).click(function (){
            var item = new NoteItemMemo(); 
            item.appendTo('[name="' + StampMemo.To + '"]');
            console.log($('[name="' + StampMemo.To + '"]')[0]);
        });
    }
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListMemo.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListMemo.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListMemo.ClassName = 'StampListMemo';