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
    <!--削除ボタン-->
    '<button id="starred" class="btn btn-default btn-xs" onclick="$(this).text(\'☆\')">★<!--span class="glyphicon glyphicon-remove"></span--></button>' + 
    <!--タグ表示用(初期：非表示)-->
    '<div id="tags" style="display:block"></div>' +
    <!--入力フォーム-->
    '<div name="formats"></div>' +
    <!--イメージ添付用-->
    '<div name="images"></div>' +
    <!--文字列入力用--> 
    '<div name="remarks"></div>' + 
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
      $(this).parent().find('[name=formats]').hide();      
      $(this).parent().find('[name=images]').hide();      
      $(this).parent().find('[name=remarks]').hide();      
    }
    else
    {
      // 特記事項が非表示の場合は、文字列を表示する。
      $(this).parent().find('#tags').hide();
      $(this).parent().find('[name=formats]').show();
      $(this).parent().find('[name=images]').show();
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

/// @summary  付箋コンテナHTMLをXMLに保存する。
/// @param    $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return   保存用XML
NoteItem.HtmlToXml = function($i_jquery)
{
  var retVal = '';

  var tag = $i_jquery.attr('name');

  retVal += '<' + tag + '>';

  //$i_jquery.find('del')
  //$i_jquery.find('min')
  //$i_jquery.find('attachImg')
  
  // □フォーム部
  $formats = $i_jquery.children('[name=formats]');
  retVal += '<' + $formats.attr('name') + '>';
  $i_jquery.children('[name=formats]').find('DIV', 'INPUT', 'IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
    console.log($(this));
  });
  retVal += '</' + $formats.attr('name') + '>';

  // □画像添付部
  $images = $i_jquery.children('[name=images]');
  retVal += '<' + $images.attr('name') + '>';
  $i_jquery.children('[name=images]').find('IMG').each(function(){
    retVal += Utility.HtmlToXhtml ($remarks.html());
  });
  retVal += '</' + $images.attr('name') + '>';

  // □備考添付部
  $remarks = $i_jquery.children('[name=remarks]');
  retVal += '<' + $remarks.attr('name') + '>';
  retVal += Utility.HtmlToXhtml ($remarks.html());
  retVal += '</' + $remarks.attr('name') + '>';
  
  retVal += '</' + tag + '>';

  return retVal;
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
  $jquery.find('[name=formats]').append(
    '<div name="disease-name">' + i_name + '</div>' 
  );
  //console.log($jquery);
  //--JQuery オブジェクト操作---//
}
NoteItemDisease.prototype = new NoteItem;

///@summary 主訴コンストラクタ
///@param $i_xml XMLオブジェクト
function NoteItemComplaint($i_xml) 
{
  this.name = 'NoteItemComplaint';
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', this.name);
  $jquery.addClass(this.name);
  
  if ($i_xml !== undefined)
  {
    if ($i_xml[0].tagName == this.name.toUpperCase())
    {
      // TODO 定型フォーマット部分を追加する。
      //console.log($i_xml.children('formats'));
      // 画像添付部分を追加する。
      $jquery.find('[name=images]').html($i_xml.children('images').html());
      // 備考部分を追加する。
      $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
    }
  //   //console.log($jquery);

  }
  //--JQuery オブジェクト操作---//
}



///@summary 検査コンストラクタ
function NoteItemMedicalCheck(i_name) 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMedicalCheck');
  $jquery.addClass('NoteItemMedicalCheck');
  $jquery.find('[name=formats]').append(
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
  //$jquery.find('[name=formats]').attr('name', 'medicine');
  $jquery.find('[name=formats]').append(
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
  $jquery.find('[name=formats]').append(
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
