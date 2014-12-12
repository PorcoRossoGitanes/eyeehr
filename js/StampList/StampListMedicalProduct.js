/**
 * 医薬品スタンプリストクラス　
 * @class StampListMedicalProduct
 * @extends StampList
 * @constructor
 */
var StampListMedicalProduct = function () {

    StampList.call(this, false, true);

	/**
	 * @property {String} _id ID
	 */
	this._id = StampListMedicalProduct.ClassName;

	/**
	 * @property {String} _title タイトル
	 */
	this._title = '医薬品';

    // スタンプを追加する。
    this.setStamps(StampMedicalProduct.ClassName);

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
            var selector = '[name="' + StampMedicalProduct.To + '"]';
            // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
            if ($(selector).length > 0)
            {
                var item = new NoteItemMedicalProduct(); 
                item.appendTo(selector);
            }
        });
    }
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListMedicalProduct.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListMedicalProduct.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListMedicalProduct.ClassName = 'StampListMedicalProduct';