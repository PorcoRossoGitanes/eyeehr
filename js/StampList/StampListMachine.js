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

    // スタンプを追加する。
    this.setStamps(StampMachine.ClassName);

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
            // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
            if ($(selector).length > 0)
            {
                var item = new NoteItemMachine(); 
                item.appendTo(selector);
            }
        });
    }

    /**
     * @event 貼付先選択用ラジオボタンを選択したとき、貼付先を変更する。
     */
    $(this._body).find('input[name="SelectTo"]:radio').change(function () {
        StampMachine.To =  $(this).val();
    });
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