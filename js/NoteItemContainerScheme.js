/**
 *カルテ項目コンテナ（シェーマ）
 * @class NoteItemContainerScheme
 */
function NoteItemContainerScheme ()
{
    NoteItemContainer.call(this, $i_xml);

    ///@param クラス名
    this._name = 'NoteItemContainerScheme';

    ///@param タイトル
    this._title = 'シェーマ';

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(this._name);
    $(this._jquery).attr('name', this._name);
    $(this._jquery).find('#title').text(this._title);
    $(this._jquery).css('left', 800);  
    $(this._jquery).css('top', 30);  
    //--JQuery オブジェクト操作---//


};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerScheme.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerScheme.prototype;
    
    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };

    /**
     * Xmlを設定する
     * @param {JQuery Object} $i_xml XML</NoteItemContainerXXX />
     */
    _proto.setByXml = function($i_xml) 
    {
        _super.setByXml.call(this, $i_xml);

        if ($i_xml !== undefined)
        {
            if ($i_xml[0].tagName == $(this._jquery).attr('name'))
            {
                for (var index = 0; index < this._xml.children.length; index++)
                {
                    var item = new NoteItemScheme();
                    item.setByXml($(this._xml.children[index])); 
                    $(this._jquery).append(item.getJQueryObject());
                }
            }
        }
    }
})();
