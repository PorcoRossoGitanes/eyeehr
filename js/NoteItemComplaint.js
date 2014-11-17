///@summary 主訴クラス
function NoteItemComplaint() 
{
  // 親クラス(Parent)のメンバ変数を継承
  NoteItem.call(this);

  /// @param クラス名
  this._name = 'NoteItemComplaint';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);  
  //--JQuery オブジェクト操作---//

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemComplaint.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemComplaint.prototype;

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $(this._jquery).attr('name'))
        {
          _super.setByXml.call(this, $i_xml);
        }
      }
    }

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };
})();

