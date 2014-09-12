// ///@summary コンストラクタ
// function NoteItem($i_jquery) {
//   $jquery = $i_jquery;
// }

///@summary コンストラクタ
function NoteItem() {
  //(初期化)-----------------------------------
  
  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  
  // @param 付箋のID
  var id = /*'ID' +*/ Math.round(Math.random() * MAX);

  // 付箋（JQuery オブジェクト）を生成する
  $jquery = $(
    '<div ' + 
    'id="' + id + '" ' + 
    'class="' + 'NoteItem' + '" ' + 
    '>' + 
    <!--削除ボタン-->
    '<button id="del" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button>' + 
    <!--最小化ボタン-->
    '<button id="min" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-minus"></span></button>' + 
    <!--画像添付ボタン-->
    '<button id="attachImg" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-upload"></span></button>' + 
    <!--タグ表示用(初期：非表示)-->
    '<div id="tags" style="display:block"></div>' +
    <!--入力フォーム-->
    '<div id="form"></div>' +
    <!--イメージ添付用-->
    '<div id="img"></div>' +
    <!--文字列入力用--> 
    '<div id="remarks" name="remarks"></div>' + 
    '</div>'
  );

  // 付箋をリサイズ・ドラッグ可能とする。
  //$jquery.resizable({handles : 's'});
  //$jquery.draggable();

  // @summary 「最小化」ボタンの押下時、タグのみ表示、または詳細（タグ以外）を表示する。
  $jquery.find('#min').click(function()
  {
    // タグが表示の場合は折り畳む（最小化する）。タグが非表示の場合は展開する。
    if ($(this).parent().find('#tags').css('display') != 'block')
    {
      // 特記事項が表示されている場合は、文字列を非表示とする。
      $(this).parent().find('#tags').show();
      $(this).parent().find('[name=remarks]').hide();      
    }
    else
    {
      // 特記事項が非表示の場合は、文字列を表示する。
      $(this).parent().find('#tags').hide();
      $(this).parent().find('[name=remarks]').show();
    }
  });

  //　@summary 「削除」ボタンが押されたときには、付箋を削除する。
  $jquery.find('#del').click(function(){
    $(this).parent().remove();
  });
  
  // @summary 付箋をダブルクリック時に入力欄を表示する。
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
  
  $jquery.find('#tags').html(tags);
  $jquery.find('[name=remarks]').html(i_memo);
}

// /// @summary 公式メソッド
// NoteItem.prototype.publicMethod = function() {
//   console.log("NoteItem's publicMethod");
// };

///@summary 病名コンストラクタ
function NoteItemDisease(i_name) 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemDisease');
  $jquery.addClass('NoteItemDisease');
  $jquery.find('#form').append(
    '<div name="disease-name">' + i_name + '</div>' 
  );
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
function NoteItemMedicalCheck(i_name) 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMedicalCheck');
  $jquery.addClass('NoteItemMedicalCheck');
  $jquery.find('#form').append(
    '<div name="medical-check-name">' + i_name + '</div>' + 
    '<input name="medical-check-custom" type="text" value="入力欄（カスタム）"/>'  // TODO : 入力欄カスタム作成
  );
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemMedicalCheck.prototype = new NoteItem;

///@summary 処方コンストラクタ
function NoteItemPrescription(i_name) 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemPrescription');
  $jquery.addClass('NoteItemPrescription');
  $jquery.find('#form').attr('name', 'medicine');
  $jquery.find('#form').append(
    '<input name="medicine-orca" type="hidden" value="ORCAID" />' + 
    '<input name="medicine-name" type="disable" value="' + i_name +'"/>' + 
    '<input name="medicine-cnt"  type="text" value="1">個'
  );
  console.log(i_name);
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemPrescription.prototype = new NoteItem;


///@summary 手術コンストラクタ
function NoteItemOperation(i_name) 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemOperation');
  $jquery.addClass('NoteItemOperation');
  $jquery.find('#form').append(
    '<div name="operation-name">' + i_name + '</div>' + 
    '<input name="operation-custom" type="text" value="入力欄（カスタム）"/>'  // TODO : 入力欄カスタム作成
  );
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
