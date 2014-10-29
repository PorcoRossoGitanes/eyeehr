///@summary 検査クラス
function NoteItemMedicalCheck() 
{
  NoteItem.call(this);

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMedicalCheck');
  $jquery.addClass('NoteItemMedicalCheck');
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
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
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

    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemMedicalCheck';
    };
})();

