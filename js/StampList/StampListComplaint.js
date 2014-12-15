/**
 * 主訴スタンプリストクラス　
 * @class StampListComplaint
 * @extends StampList
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

    // スタンプを追加する。
    this.setStamps(StampComplaint.ClassName);

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
            var selector = '[name="' + StampComplaint.To + '"]';
            // 貼付先が存在するか確認し、貼付先がない場合、エラーメッセージを表示する。
            if ($(selector).length > 0)
            {
                var item = new NoteItemComplaint(); 
                item.appendTo(selector);
                // 主訴は備考欄のみであるため、備考入力画面を開く。
                item.openRemark();
            }
        });
    }

    /**
     * @event 貼付先選択用ラジオボタンを選択したとき、貼付先を変更する。
     */
    $(this._body).find('input[name="SelectTo"]:radio').change(function () {
        StampComplaint.To =  $(this).val();
    });
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