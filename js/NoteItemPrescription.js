///@summary 処方クラス
function NoteItemPrescription() 
{
  NoteItem.call(this);  // 入力文字列

  /// @param クラス名
  this._name = 'NoteItemPrescription';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);
  //--JQuery オブジェクト操作---//

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemPrescription.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemPrescription.prototype;

    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormat = function (i_name)
    {
      $(this._jquery).find('[name=formats]').append(
        '<input name="medicine-orca" type="hidden" value="ORCAID" />' + 
        '<input name="medicine-name" type="disable" value="' + i_name +'"/>' + 
        '<input name="medicine-cnt"  type="text" value="1">個'
      );
    }

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

