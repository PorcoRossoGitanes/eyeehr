//--------------------------------------------------//
///@summary カルテ項目コンテナ（メモ）
///@param $i_xml XML JQuery Object
function NoteItemContainerMemo ($i_xml)
{
    ///@param クラス名
    this._name = 'NoteItemContainerMemo';

	NoteItemContainer.call(this, this._name, 'メモ', $i_xml);

    //--JQuery オブジェクト操作---//
    $jqueryNoteItemContainer.addClass(this._name);
    //--JQuery オブジェクト操作---//

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemMemo(); 
                item.setByXml($(this));
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
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

