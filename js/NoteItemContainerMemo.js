//--------------------------------------------------//
///@summary カルテ項目コンテナ（メモ）
///@param $i_xml XML JQuery Object
function NoteItemContainerMemo ($i_xml)
{
	NoteItemContainer.call(this, 'NoteItemContainerMemo', 'メモ', $i_xml);

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
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerMemo';
    };
})();

