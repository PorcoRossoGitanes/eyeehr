/**
 * 検査スタンプクラス
 * @class StampMedicalCheck
 * @constructor
 * @extends Stamp
 */
 function StampMedicalCheck() 
 {
  // 親クラス(Parent)のメンバ変数を継承
  Stamp.call(this);
  
  /**
   * @param {String}クラス名
   */
   this._name = 'StampMedicalCheck';

  /**
   * @param {String} XML
   * @static
   */
   arguments.callee.Xml = ''; 

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);  
  //--JQuery オブジェクト操作---//

  $(this._jquery).click(function () {
    
    var item = new NoteItemMedicalCheck(); 

    item.setTitle($(this).attr('title'));
    
    var xml = $(this).data('xml');
    item.setOrca($(xml).children('Orca')[0]);

    item.appendTo('[name=NoteItemContainerMedicalCheck]');  
  });

};(function() {

  // 継承設定
  var Super = function Super(){};
  Super.prototype = Stamp.prototype;
  StampMedicalCheck.prototype = new Super();
  var _super = Super.prototype;
  var _proto = StampMedicalCheck.prototype;

  /**
   * XMLを設定する。
   * @param {String} i_xml XMLオブジェクト
   */
   _proto.setByXml = function (i_xml)
   {
    if (i_xml !== undefined) _super.setByXml.call(this, i_xml);
  }

  /**
   * クラス名を取得する。
   * @method getName
   */
   _proto.getName = function() 
   {
    var name = _super.getName.call(this);
    return name + ' ' + this._name;
  };
})();
