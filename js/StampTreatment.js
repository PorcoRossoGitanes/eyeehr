/**
 * 処置スタンプクラス
 * @class StampTreatment
 */
function StampTreatment() 
{
  // 親クラス(Parent)のメンバ変数を継承
  Stamp.call(this);

  /**
   * @param {String}クラス名
   */
  this._name = 'StampTreatment';

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

    var item = new NoteItemOperation(); 

    item.setTitle($(this).attr('title'));

    var xml = $(this).data('xml');
    item.setOrca($(xml).children('Orca')[0]);

    item.appendTo('[name=NoteItemContainerOperation]');  
  });

};(function() {

    // 継承設定
    var Super = function Super(){};
    Super.prototype = Stamp.prototype;
    StampTreatment.prototype = new Super();
    var _super = Super.prototype;
    var _proto = StampTreatment.prototype;

    /**
     * XMLを設定する。
     * @param {String} i_xml XMLオブジェクト
     */
    _proto.setByXml = function (i_xml)
    {
      if (i_xml !== undefined) _super.setByXml.call(this, i_xml);
    }

    ///@summary クラス名（親クラス...現在のクラス）を取得する
    ///@return クラス名（親クラス...現在のクラス）
    _proto.getName = function() 
    {
        var name = _super.getName.call(this);
        return name + ' ' + this._name;
    };
})();

