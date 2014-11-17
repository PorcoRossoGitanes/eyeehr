//--------------------------------------------------//

///@summary カルテ項目コンテナ（検査）
///@param $i_xml XML JQuery Object
function NoteItemContainerMedicalCheck ($i_xml)
{
    NoteItemContainer.call(this,　$i_xml);

    ///@param クラス名
    this._name = 'NoteItemContainerMedicalCheck';

    ///@param タイトル
    this._title = '検査';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(this._name);
    $(this._jquery).attr('name', this._name);
    $(this._jquery).find('#title').text(this._title);
    //--JQuery オブジェクト操作---//

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $(this._jquery).attr('name'))
        {
            $i_xml.children().each(function(){
                var item = new NoteItemMedicalCheck();
                item.setByXml($(this)); 
                $(this._jquery).append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerMedicalCheck.prototype;

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };

})();

