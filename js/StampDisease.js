/**
 * 病名（所見）スタンプクラス
 * @class StampDisease
 */
function StampDisease() 
{
  Stamp.call(this);

  /**
   * @param {String}クラス名
   */
  this._name = 'StampDisease';

  /**
   * @param {String} XML
   * @static
   */
  arguments.callee.Xml = ''; 

  //--JQuery オブジェクト操作---//
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);  
  //--JQuery オブジェクト操作---//

  $(this._jquery).click(function () {
    var item = new NoteItemDisease();

    item.setTitle($(this).attr('title'));
    
    item.appendTo('[name="NoteItemContainerDisease"]');  
  });

};(function() {

    // 継承設定
    var Super = function Super(){};
    Super.prototype = Stamp.prototype;
    StampDisease.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampDisease.prototype;

    /**
     * XMLを設定する。
     * @param {String} i_xml XMLオブジェクト
     */
    _proto.setByXml = function (i_xml)
    {
      if (i_xml !== undefined) _super.setByXml.call(this, i_xml);
    }

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @return クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };
})();

