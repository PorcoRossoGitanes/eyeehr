///@summary シェーマコンストラクタ
///@param $i_xml XML
function NoteItemScheme() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  /// @param クラス名
  this._name = 'NoteItemScheme';

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', this._name);
  $jquery.addClass(this._name);
  // シェーマの場合のみ、「シェーマ」ボタンを表示する。
  $jquery.children('button#addScheme').css('visibility', 'inherit');
  // シェーマ添付部を表示する。
  $jquery.children('div[name="scheme"]').css('visibility', 'inherit');
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
  
  ///@summary クラス名（親クラス...現在のクラス）を取得する
  ///@return クラス名（親クラス...現在のクラス）
  _proto.getName = function() 
  {
      var name = _super.getName.call(this);
      return name + ' ' + this._name;
  };

})();
