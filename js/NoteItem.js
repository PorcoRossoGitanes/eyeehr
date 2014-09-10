// ///@summary コンストラクタ
// function NoteItem($i_jquery) {
//   $jquery = $i_jquery;
// }

///@summary コンストラクタ
function NoteItem() {

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  // @param 付箋のID
  var id = /*'ID' +*/ Math.round(Math.random() * MAX);

  // 付箋を生成する
  $jquery = $(
    '<div ' + 
    'id="' + id + '" ' + 
    'class="' + 'NoteItem' + '" ' + 
    '>' + 
    <!--削除ボタン-->
    '<button id="del" class="btn btn-default btn-xs">x</button>' + 
    <!--最小化ボタン-->
    '<button id="min" class="btn btn-default btn-xs" >_</button>' + 
    <!--画像添付ボタン-->
    '<button id="attachImg" class="btn btn-default btn-xs">画像</button>' + 
    <!--タグ表示用-->
    '<div id="tags"></div>' +
    <!--入力フォーム-->
    '<div id="form"></div>' +
    <!--イメージ添付用-->
    '<div id="img"></div>' +
    <!--文字列入力用--> 
    '<div id="remarks" name="remarks">&nbsp;</div>' + 
    '</div>'
  );
  // 表示されている場合は、文字列を非表示とする。
  $(this).parent().find('[name=tags]').show();

  // 付箋をリサイズ・ドラッグ可能とする。
  //$jquery.resizable({handles : 's'});
  //$jquery.draggable();

  // @summary 「最小化」ボタンを押下したときには、文字列を表示／非表示を設定する。
  $jquery.find('#min').click(function()
  {
    if ($(this).parent().find('[name=remarks]').css('display') == 'block') 
    {
      // 表示されている場合は、文字列を非表示とする。
      $(this).parent().find('[name=tags]').show();
      $(this).parent().find('[name=remarks]').hide();
    } 
    else 
    {
      // 非表示の場合は、文字列を表示する。
      $(this).parent().find('[name=tags]').hide();
      $(this).parent().find('[name=remarks]').show();
    }
  });

  //　@summary 「削除」ボタンが押されたときには、付箋を削除する。
  $jquery.find('#del').click(function(){
    $(this).parent().remove();
  });

  
  // 付箋をダブルクリック時に入力欄を表示する。
  $jquery.dblclick(function(){
    var memo = $(this).find('[name=remarks]').html();
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
  
  $jquery.find('[name=tags]').html(tags);
  $jquery.find('[name=remarks]').html(i_memo);
}

// /// @summary 公式メソッド
// NoteItem.prototype.publicMethod = function() {
//   console.log("NoteItem's publicMethod");
// };

///@summary 病名コンストラクタ
function NoteItemDisease() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemDisease');
  $jquery.addClass('NoteItemDisease');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemDisease.prototype = new NoteItem;

///@summary 主訴コンストラクタ
function NoteItemComplaint() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemComplaint');
  $jquery.addClass('NoteItemComplaint');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemComplaint.prototype = new NoteItem;

///@summary 検査コンストラクタ
function NoteItemMedicalCheck() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMedicalCheck');
  $jquery.addClass('NoteItemMedicalCheck');
  //$jquery.find('#form').append('<div>視力検査</div><input type=text value="test"/>');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemMedicalCheck.prototype = new NoteItem;

///@summary 処方コンストラクタ
function NoteItemPrescription() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemPrescription');
  $jquery.addClass('NoteItemPrescription');
  $jquery.find('#form').attr('name', 'medicine');
  $jquery.find('#form').append(
    '<input name="medicine-orca" type="hidden" value="ORCAID" />' + 
    '<input name="medicine-name" type="disable" value="タリビッド眼軟膏0.3%"/>' + 
    '<input name="medicine-cnt"  type="text" value="1">個'
  );
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemPrescription.prototype = new NoteItem;


///@summary 手術コンストラクタ
function NoteItemOperation() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
   $jquery.attr('name', 'NoteItemOperation');
 $jquery.addClass('NoteItemOperation');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemOperation.prototype = new NoteItem;

///@summary メモコンストラクタ
function NoteItemMemo() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMemo');
  $jquery.addClass('NoteItemMemo');
  //console.log($jquery);
  //--JQuery オブジェクト操作---//

}
NoteItemMemo.prototype = new NoteItem;
