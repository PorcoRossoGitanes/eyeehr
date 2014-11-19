//--------------------------------------------------//
///@summary カルテ項目コンテナ（メモ）
///@param $i_xml XML JQuery Object
function NoteItemContainerMemo ($i_xml)
{
    NoteItemContainer.call(this, $i_xml);

    ///@param クラス名
    this._name = 'NoteItemContainerMemo';

    ///@param タイトル
    this._title = 'メモ';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(this._name);
    $(this._jquery).attr('name', this._name);
    $(this._jquery).find('#title').text(this._title);
    $(this._jquery).css('left', 800);  
    $(this._jquery).css('top', 170);
    //--JQuery オブジェクト操作---//

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $(this._jquery).attr('name'))
        {
            for (var index = 0; index < this._xml.children.length; index++)
            {
                var item = new NoteItemMemo();
                item.setByXml($(this._xml.children[index])); 
                $(this._jquery).append(item.getJQueryObject());
            }
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMemo.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerMemo.prototype;

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };

})();

