/**
 * 手術コンストラクタ
 * @class NoteItemOperation
 */
function NoteItemOperation() 
{
  NoteItem.call(this);

  /// @param クラス名
  this._name = 'NoteItemOperation';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);
  //--JQuery オブジェクト操作---//

};(function() {

    // 継承設定
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemOperation.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemOperation.prototype;

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


