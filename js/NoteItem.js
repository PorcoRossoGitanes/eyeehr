///@summary コンストラクタ
function NoteItem(i_text, i_bgcolor) {

  ///@param クラス名
  this.name = 'NoteItem';

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  // @param 付箋のID
  this.id = 'ID' + Math.round(Math.random() * MAX);

  // 付箋を生成する
  $jquery = $(
    '<div ' + 
    'id="' + this.id + '" ' + 
    'class="' + this.name + '" ' + 
    '>' + 
    <!--削除ボタン-->
    '<button id="del" class="btn btn-danger btn-xs">x</button>' + 
    <!--最小化ボタン-->
    '<button id="min" class="btn btn-info btn-xs" >_</button>' + 
    <!--タグ表示用-->
    '<div id="tags"></div>' +
    <!--入力フォーム-->
    '<div id="form"></div>' +
    <!--文字列入力用--> 
    '<div id="remarks">' + i_text + '</div>' + 
    '</div>'
  );

  // 「最小化」ボタンを押下したときには、文字列を表示／非表示を設定する。
  $jquery.find('#min').click(function(){
    if ($(this).parent().find('#remarks').css('display') == 'block') {
      // 表示されている場合は、文字列を非表示とする。
      $(this).parent().find('#tags').show();
      $(this).parent().find('#remarks').hide();
    } else {
      // 非表示の場合は、文字列を表示する。
      $(this).parent().find('#tags').hide();
      $(this).parent().find('#remarks').show();
    }
  });
  //　「削除」ボタンが押されたときには、付箋を削除する。
  $jquery.find('#del').click(function(){
    $(this).parent().remove();
  });

  // 付箋をリサイズ・ドラッグ可能とする。
  //$jquery.resizable({handles : 's'});
  //$jquery.draggable();
  
  // 付箋をダブルクリック時に入力欄を表示する。
  $jquery.dblclick(function(){
    var memo = $(this).find('#remarks').html();
    area.instanceById('area1').setContent(memo);
    $('input#selectedNoteItem').val($(this).attr('id'));
  });

  ///@summary 付箋をカルテ上に登録する
  ///@param 貼付先
  this.appendTo = function(i_to)
  {
    // 付箋をカルテ欄に登録する。
    $jquery.appendTo(i_to);  
    $jquery.dblclick();
  }

  ///@summary クラス名を取得する。
  this.getName = function() 
  {
    return this.name;
  };
}

// @summary 文字列を変更する。
NoteItem.ChangeVal = function($jquery, i_memo)
{
  $memo = $('<memo>' + i_memo + '</memo>');
  $strongs = $memo.find('strong');

  var tags = '';
  for (index = 0; index < $strongs.length; index++)
  {
    tags += $($strongs[index]).text() + 
      (index == ($strongs.length - 1) ? '' : ',');
    //console.log($($strongs[index]).text());
  }
  
  $jquery.find('#tags').html(tags);
  $jquery.find('#remarks').html(i_memo);
}

/// @summary 公式メソッド
NoteItem.prototype.publicMethod = function() {
  console.log("NoteItem's publicMethod");
};

///@summary 病名コンストラクタ
function NoteItemDisease(i_text) 
{
  NoteItem.call(
    this, 
    i_text//,                       // 入力文字列
  );

  this.name = 'NoteItemDisease';

  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemDisease.prototype = new NoteItem;

///@summary 主訴コンストラクタ
function NoteItemComplaint(i_text) 
{
  NoteItem.call(
      this, 
      i_text//,                         // 入力文字列
  );

  this.name = 'NoteItemComplaint';
  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemComplaint.prototype = new NoteItem;

///@summary 検査コンストラクタ
function NoteItemMedicalCheck(i_text) 
{
  NoteItem.call(
      this, 
      i_text//,                         // 入力文字列
  );

  this.name = 'NoteItemMedicalCheck';

  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  $jquery.find('#form').append('<div>視力検査</div><input type=text value="test"/>');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemMedicalCheck.prototype = new NoteItem;

///@summary 処方コンストラクタ
function NoteItemPrescription(i_text) 
{
  NoteItem.call(
      this, 
      i_text//,                         // 入力文字列
  );

  this.name = 'NoteItemPrescription';

  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemPrescription.prototype = new NoteItem;


///@summary 手術コンストラクタ
function NoteItemOperation(i_text) 
{
  NoteItem.call(
      this, 
      i_text//,                         // 入力文字列
  );

  this.name = 'NoteItemOperation'; 

  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemOperation.prototype = new NoteItem;

///@summary メモコンストラクタ
function NoteItemMemo(i_text) 
{
  NoteItem.call(
      this, 
      i_text//,                         // 入力文字列
  );

  this.name = 'NoteItemMemo';

  //--JQuery オブジェクト操作---//
  $jquery.addClass(this.name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//

}
NoteItemMemo.prototype = new NoteItem;
