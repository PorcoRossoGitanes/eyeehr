/**
 * 主訴スタンプリストクラス　
 * @class StampListComplaint
 * @constructor
 */
var StampListComplaint = function () {

    StampList.call(this, true, false);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListComplaint.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '主訴';

    //--JQuery オブジェクト操作---//
    $(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//
    
    if(this._hasOne) 
    {
        $(this._head).click(function (){
        	var item = new NoteItemComplaint(); 
        	item.appendTo('[name="' + StampComplaint.To + '"]');
            console.log($('[name="' + StampComplaint.To + '"]')[0]);
        });
    }
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListComplaint.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListComplaint.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListComplaint.ClassName = 'StampListComplaint';