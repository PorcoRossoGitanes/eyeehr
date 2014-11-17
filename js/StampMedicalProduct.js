///@summary 医薬品スタンプクラス
function StampMedicalProduct() 
{
  // 親クラス(Parent)のメンバ変数を継承
  Stamp.call(this);

  /// @param クラス名
  this._name = 'StampMedicalProduct';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', this._name);
  $jquery.addClass(this._name);  
  //--JQuery オブジェクト操作---//

  $jquery.click(function () {
    // TODO : 項目によって貼付先が異なる
    var item = new NoteItemContainerPrescription(); 
    item.setFormats($(this).attr('title'));
    item.appendTo('[name=NoteItemContainerPrescription]');  
  });

};(function() {

    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = Stamp.prototype;
  
    StampMedicalProduct.prototype = new Super();
  
    var _super = Super.prototype;
  
    // プロトタイプ
    var _proto = StampMedicalProduct.prototype;

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined) _super.setByXml.call(this, $i_xml);
      //console.log(this._title);
    }

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };
})();

