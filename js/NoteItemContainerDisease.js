//--------------------------------------------------//
///@summary カルテ項目コンテナ（所見（病名））
///@param $i_xml XML JQuery Object
function NoteItemContainerDisease ($i_xml)
{
    NoteItemContainer.call(this, $i_xml);

    ///@param クラス名
    this._name = 'NoteItemContainerDisease';

        ///@param タイトル
    this._title = '病名';

    //--JQuery オブジェクト操作---//
    $jqueryNoteItemContainer.addClass(this._name);
    $jqueryNoteItemContainer.attr('name', this._name);
    $jqueryNoteItemContainer.find('#title').text(this._title);
    //--JQuery オブジェクト操作---//

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name'))
        {
            $i_xml.children().each(function(){
                var item = new NoteItemDisease();
                item.setByXml($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
        //console.log($jqueryNoteItemContainer);
    }

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerDisease.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerDisease.prototype;

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };
})();

