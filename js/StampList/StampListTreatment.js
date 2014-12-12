/**
 * 処置スタンプリストクラス　
 * @class StampListTreatment
 * @extends StampList
 * @constructor
 */
var StampListTreatment = function () {

    StampList.call(this, false, false);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListTreatment.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '処置';
    
    // スタンプを追加する。
    this.setStamps(StampTreatment.ClassName);

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
            var selector = '[name="' + StampTreatment.To + '"]';
            // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
            if ($(selector).length > 0)
            {
                var item = new NoteItemTreatment(); 
                item.appendTo(selector);
            }
        });
    }
};
(function() {
    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListTreatment.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListTreatment.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListTreatment.ClassName = 'StampListTreatment';