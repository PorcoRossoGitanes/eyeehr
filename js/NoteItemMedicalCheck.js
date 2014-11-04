///@summary 検査クラス
function NoteItemMedicalCheck() 
{
  NoteItem.call(this);

  /// @param
  this._name = 'NoteItemMedicalCheck';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', this._name);
  $jquery.addClass(this._name);
  //--JQuery オブジェクト操作---//

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemMedicalCheck.prototype;

        ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name'))
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }

    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormats = function (i_name)
    {
      $jquery.find('[name=formats]').append(
        '<div name="medical-check-name">' + i_name + '</div>' + 
        '<input name="medical-check-custom" type="text" value="入力欄（カスタム）"/>'  
        // TODO : 入力欄カスタム作成
      );
    }

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };

})();

