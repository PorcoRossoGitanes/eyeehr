///@summary シェーマコンストラクタ
///@param $i_xml XML
function NoteItemScheme() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  /// @param クラス名
  this._name = 'NoteItemScheme';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);
  // // シェーマの場合のみ、「シェーマ」ボタンを表示する。
  // $(this._jquery).children('button#addScheme').css('visibility', 'inherit');
  // // シェーマ添付部を表示する。
  // $(this._jquery).children('div[name="schemes"]').css('visibility', 'inherit');
  //--JQuery オブジェクト操作---//

};(function() {
  // 親クラス(Parent)のメソッドを継承
  var Super = function Super(){};
  Super.prototype = NoteItem.prototype;
  NoteItemScheme.prototype = new Super();
  var _super = Super.prototype;
  // プロトタイプ
  var _proto = NoteItemScheme.prototype;
  
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
