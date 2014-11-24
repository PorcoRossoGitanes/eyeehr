/**
 * 特殊機材スタンプクラス
 * @class StampMachine
 * @constructor
 * @extends Stamp
 */
 function StampMachine() 
 {
  // 親クラス(Parent)のメンバ変数を継承
  Stamp.call(this);

  /**
   * クラス名
   * @type {String}
   */
   this._name = 'StampMachine';

  /**
   * XML
   * @static
   * @type {String}
   */
   arguments.callee.Xml = ''; 

  //--JQuery オブジェクト操作---//
  $(this._jquery).attr('name', this._name);
  $(this._jquery).addClass(this._name);  
  //--JQuery オブジェクト操作---//

  $(this._jquery).click(function () 
  {
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
  StampMachine.prototype = new Super();
  var _super = Super.prototype;
  var _proto = StampMachine.prototype;

  /**
   * XMLを設定する。
   * @param {String/Object} i_xml XML
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

