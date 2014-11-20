//--------------------------------------------------//

///@summary カルテ項目コンテナ（検査）
///@param $i_xml XML JQuery Object
function NoteItemContainerMedicalCheck ()
{
    NoteItemContainer.call(this);

    /**
     * @param クラス名
     */
    this._name = 'NoteItemContainerMedicalCheck';

    /**
     * @param タイトル
     */
    this._title = '検査';

    /**
     * @param 左座標
     */
    this._left = '350px';  
    
    /**
     * @param 上座標
     */
    this._top = '170px';  

    //--JQuery オブジェクト操作---//
    $(this._jquery).addClass(this._name);
    $(this._jquery).attr('name', this._name);
    $(this._jquery).find('#title').text(this._title);
    //--JQuery オブジェクト操作---//

    this.update();

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerMedicalCheck.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */   
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

        // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
        if ($i_xml !== undefined)
        {
            if ($i_xml[0].tagName == $(this._jquery).attr('name'))
            {
                for (var index = 0; index < this._xml.children.length; index++)
                {
                    var item = new NoteItemMedicalCheck();
                    item.setByXml($(this._xml.children[index])); 
                    $(this._jquery).append(item.getJQueryObject());
                }
            }
        }
    }

})();

