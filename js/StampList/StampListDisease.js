/**
 * 病名スタンプリストクラス
 * @class StampListDisease
 * @extends StampList
 * @constructor
 */
var StampListDisease = function() {

    StampList.call(this, false, false);

    /**
     * @property {String} _id ID
     */
    this._id = StampListDisease.ClassName;

    /**
     * @property {String} _title タイトル
     */
    this._title = '病名';

    // スタンプを追加する。
    this.setStamps(StampDisease.ClassName);

    //--JQuery オブジェクト操作---//
    $(this._head).text(this._title);
    $(this._body).attr('id', this._id);
    //--JQuery オブジェクト操作---//

    /**
     * @event （スタンプが1つの場合のみ)ヘッダーをクリックした場合に、NoteItemを登録する。
     */
    if (this._hasOne) {
        $(this._head).click(function() {
            var selector = '[name="' + StampDisease.To + '"]';
            // 貼付先が存在するか確認し、貼付先がない場合、貼り付けを中止する。
            if ($(selector).length > 0) {
                var item = new NoteItemDisease();
                item.appendTo(selector);
            }
        });
    }

    /**
     * @event 貼付先選択用ラジオボタンを選択したとき、貼付先を変更する。
     */
    $(this._body).find('input[name="SelectTo"]:radio').change(function () {
        StampDisease.To =  $(this).val();
    });
};
(function() {

    // 継承設定
    var Super = function Super() {};
    Super.prototype = StampList.prototype;
    StampListDisease.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampListDisease.prototype;

})();

/**
 * @property {String} ClassName クラス名
 * @static
 */
StampListDisease.ClassName = 'StampListDisease';
