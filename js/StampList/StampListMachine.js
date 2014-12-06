/**
 * 特定機材スタンプリストクラス　
 * @class StampListMachine
 * @extends StampList
 * @constructor
 */
var StampListMachine = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListMachine.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '特定機材';

    //--JQuery オブジェクト操作---//
	$(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//

    /**
     * @event （スタンプが1つの場合のみ)ヘッダーをクリックした場合に、NoteItemを登録する。
     */
    if(this._hasOne) 
    {
        $(this._head).click(function (){
            var selector = '[name="' + StampMachine.To + '"]';
            // 貼付先が存在するか確認し、貼付先がない場合、エラーメッセージを表示する。
            if ($(selector) !== undefined)
            {
                var item = new NoteItemMachine(); 
                item.appendTo(selector);
            }
        });
    }
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListMachine.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListMachine.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListMachine.ClassName = 'StampListMachine';