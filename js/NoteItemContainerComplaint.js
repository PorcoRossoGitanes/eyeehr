//--------------------------------------------------//

///@summary カルテ項目コンテナ（主訴）
///@param $i_xml XML JQuery Object
function NoteItemContainerComplaint ($i_xml)
{
	NoteItemContainer.call(this, this.getName(), '主訴', $i_xml);

	// 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
	if ($i_xml !== undefined)
	{
		if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
		{
            $i_xml.children().each(function(){
                var item = new NoteItemComplaint();
                item.setByXml($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
		}
	}
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerComplaint.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerComplaint.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerComplaint';
    };
})();

