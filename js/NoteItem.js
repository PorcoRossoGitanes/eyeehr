// ノートアイテムクラス
function NoteItem() {
  // メンバ変数の初期化
  this._name = 'NoteItem';

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  
  // @param 付箋のID
  var id = /*'ID' +*/ Math.round(Math.random() * MAX);

  // 付箋（JQuery オブジェクト）を生成する 。
  const uploadFileToXmlDb = "/exist/apps/eyeehr/modules/uploadFileBin.xq";
  
  // 画像の保存先を設定する。
  // TODO : 画像の保存先はカルテのフォルダの直下のimgコレクションとする。（後で対応）
  const saveImageTo = '/db/apps/eyeehr/img';

  /*** 画像ファイル入力フォーム ***/
  var iframetarget = 'uploadImage-' + id;
  var formAttachFile =     
    '<form ' + 
    'id="attachFileForm" ' + 
    'enctype="multipart/form-data" ' + 
    'method="post" ' +
    'action="' + uploadFileToXmlDb + '" ' + 
    'target="' + iframetarget + '"' + 
    'style="display:none" ' + 
    '>' +
    '<input type="input" name="type" value="bin"/>' + 
    '<input id="attachFile" type="file" name="file" value="" ' + 
    //'style="display:none" ' + 
    'accept="image/jpeg, image/png, image/bmp, application/pdf" ' + 
    '/>' +
    '<input type="input" name="collection" value="' + saveImageTo + '"/>' + 
    '<input id="attachFileSubmit" type="submit" value="submit" />' +
    '</form>' +
    '<iframe name="' + iframetarget + '" ' + 
    'style="display:none"' + 
    '></iframe>'; //結果表示用iframe
  /*** 画像ファイル入力フォーム ***/

  $jquery = $(
    '<div ' + 
    'id="' + id + '" ' + 
    'class="' + this._name + '" ' + 
    '>' + 
/*** 削除ボタン ***/
    '<button id="del" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button>' + 
/*** 最小化ボタン ***/
    '<button id="min" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-minus"></span></button>' + 
/*** ☆ボタン ***/
    // '<button id="starred" class="btn btn-default btn-xs" onclick="$(this).text(\'☆\')">' + 
    // '★<!--span class="glyphicon glyphicon-remove"></span-->' + 
    // '</button>' + 
/***ファイル　添付***/
    formAttachFile + // 隠し埋め込みフォーム
    '<button id="attachFile" class="btn btn-default btn-xs" ><span class="glyphicon glyphicon-upload"></span></button>' + 
/***ファイル　添付***/
/***シェーマ添付（処置・手術・検査などでシェーマを書くので、デフォルト表示とする。）***/
    '<button id="addScheme" class="btn btn-default btn-xs" style="visibility:inherit">シェーマ</button>' + 
/***シェーマ添付***/
    '<div id="tags" style="display:block"></div>' +   <!--タグ表示用(初期：非表示)-->
    '<div name="Orca" style="display:block"></div>' + <!--入力フォーム（ORCA連携用定型フォーム）-->
    '<div name="formats"></div>' +                    <!--入力フォーム（定型フォーム）-->
    '<div name="attachments"></div>' +                <!--ファイル添付用--> 
    '<div name="schemes"></div>' +                    <!--シェーマ添付用--> 
    '<div name="remarks"></div>' +                    <!--備考入力用--> 
    '</div>'
  );

  // 付箋をリサイズ・ドラッグ可能とする。
  //$jquery.resizable({handles : 's'});
  //$jquery.draggable();

  /// @summary 画像を追加する。
  $jquery.find('button#attachFile').click(function () {
    // 画像選択ボタンを取得する。
    $inputAttachImage = $(this).parent().find('form > input#attachFile');
    // 画像選択ボタンをクリックする。
    $inputAttachImage.click();
    // 画像選択がなされたら、ファイルパスを取得し、画像を追加する。
    // 画像アップロード結果が入ってきたら、画像を追加する。
    $inputAttachImage.change(function () {
      // 画像ファイル名が入力済みの場合のみ、フォームから画像を送信する。
      if($(this).val() != "") 
      {
        $form = $(this).parent();
        $form.submit();
      }
    });
  });

  /// @summary  ファイル添付（送信）処理が実施され、
  ///           iframeがロードされたとき、
  ///           成功時はファイル（imgタグ）を表示する。
  $jquery.find('iframe').load(function()
  {
    // ファイル名が指定されているか確認する。
    var file = $(this).parent().find("#attachFile").val();
    var url =  $(this).contents().find('#url').text();
    //console.log($(this).contents());
    if (file == "")
    {
      // 画像ファイルが指定されていない場合は処理を実行しない。
    }
    else if (url == "")
    {
      // 画像ファイルが指定されているが、URLが未指定の場合、保存に失敗したと見なす。
      alert('ファイルの保存に失敗しました。');
    }
    else 
    {
      NoteItem.AttachFile($(this).parent().find('[name=attachments]'), url);
    }
  });

  /// @summary シェーマ画像を追加するために、シェーマ描画ツールを表示する。
  $jquery.find('button#addScheme').click(function () {
    
    // Method Drawの画面最大サイズ
    const MethodDrawWidthMax = 1024;
    const MethodDrawHeightMax = 768;
    // Meethod DrawのURL(相対パス)
    const MethodDrawPath = './method_draw/editor/index.html';

    // Method Drawの画面サイズ（画面をオーバーする場合は画面のサイズに合わせる。）
    var methodDrawWidth = window.parent.screen.width > MethodDrawWidthMax ? MethodDrawWidthMax : window.parent.screen.width;
    var methodDrawHeight = window.parent.screen.heght > MethodDrawHeightMax ? MethodDrawHeightMax : window.parent.screen.height;

    // NoteItemのIDを取得する。
    var noteItemId = $(this).parent().attr("id");

    // コマンドを設定する（追加時「add」、編集時「edit」とする。）
    var url = MethodDrawPath + '?command=add' + 
      '&id=' + noteItemId + 
      '&image=' + saveImageTo +'/' +　'scheme-' + (new Date()).getTime() +'.svg';

    // Method Drawを開く。
    window.open(url, '', 'width=' + methodDrawWidth + ',height=' + methodDrawHeight);
  });

  // /// @summary シェーマ領域が変更された場合に、画像にコンテキストイベントを追加する。
  // $jquery.find('div#scheme').load(function(){
    
  //   // console.log('シェーマ画像が変更されました。');
  //   // alert('シェーマ画像が変更されました。');
        
  //   // シェーマ画像を右クリックしたときに、コンテキストメニュー表示出来るように変更する。
  //   $(this).find('img').each(function () {

  //   });
  // });

  /// @summary 「最小化」ボタンの押下時、タグのみ表示、または詳細（タグ以外）を表示する。
  $jquery.find('button#min').click(function()
  {
    // タグが表示の場合は折り畳む（最小化する）。タグが非表示の場合は展開する。
    if ($(this).parent().find('#tags').css('display') != 'block')
    {
      // 特記事項が表示されている場合は、文字列を非表示とする。
      $(this).parent().find('#tags').show();
      $(this).parent().find('[name=formats]').hide();      
      $(this).parent().find('[name=attachments]').hide();      
      $(this).parent().find('[name=remarks]').hide();      
    }
    else
    {
      // 特記事項が非表示の場合は、文字列を表示する。
      $(this).parent().find('#tags').hide();
      $(this).parent().find('[name=formats]').show();
      $(this).parent().find('[name=attachments]').show();
      $(this).parent().find('[name=remarks]').show();
    }
  });

  //　@summary 「削除」ボタンが押されたときには、付箋を削除する。
  $jquery.find('button#del').click(function(){
    $(this).parent().remove();
  });
  
  // @summary 付箋をダブルクリック時に入力欄を表示する。
  $jquery.dblclick(function(){
    var memo = $(this).find('[name=remarks]').html();
    area.instanceById('area1').setContent(memo);
    $('input#selectedNoteItem').val($(this).attr('id'));
  });


};(function() {

  // プロトタイプ
  var _proto = NoteItem.prototype;
  // メンバメソッド

  _proto.getName = function() {
      return this._name;
  };

  _proto.setName = function(name) {
      this._name = name;
  };

  ///@summary 付箋をカルテ上に登録する
  ///@param 貼付先
  _proto.appendTo = function(i_to)
  {
    // 付箋をカルテ欄に登録する。
    $jquery.appendTo(i_to);  
    $jquery.dblclick();
  }

  ///@summary JQueryObjectを出力する
  ///@return JQueryObject
  _proto.getJQueryObject = function () 
  {
    return $jquery;
  }

  ///@summary XMLを設定する。
  ///@param $i_xml XMLオブジェクト
  _proto.setByXml = function ($i_xml)
  {
    if ($i_xml !== undefined)
    {
      // TODO : 定型フォーマット部分を追加する。
      //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
      // ファイル添付部分を追加する。
      $jquery.find('[name=attachments]').html(Utility.InnerHtml($i_xml.children('attachments')));
      // シェーマ部分を追加する。
      $jquery.find('[name=schemes]').html(Utility.InnerHtml($i_xml.children('schemes')));
      // 備考部分を追加する。
      $jquery.find('[name=remarks]').html(Utility.InnerHtml($i_xml.children('remarks')));
    }
  }
})();
   
/// @summary  付箋コンテナHTMLをXMLに保存する。
/// @param    $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return   保存用XML
NoteItem.HtmlToXml = function($i_jquery)
{
  var retVal = '';

  var tag = $i_jquery.attr('name');

  retVal += '<' + tag + ' id="' + $i_jquery.attr('id') +'">';

  //$i_jquery.find('del')
  //$i_jquery.find('min')
  //$i_jquery.find('attachFile')
  
  // □フォーム部をXMLに変換する。
  $formats = $i_jquery.children('[name=formats]');
  retVal += '<' + $formats.attr('name') + '>';
  $i_jquery.children('[name=formats]').find('DIV', 'INPUT', 'IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
  });
  retVal += '</' + $formats.attr('name') + '>';

  // □画像添付部をXMLに変換する。
  $attachments = $i_jquery.children('[name=attachments]');
  retVal += '<' + $attachments.attr('name') + '>';
  $attachments.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
  });
  retVal += '</' + $attachments.attr('name') + '>';

  // □シェーマ添付部をXMLに変換する。
  $schemes = $i_jquery.children('[name=schemes]');
  retVal += '<' + $schemes.attr('name') + '>';
  $schemes.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this)); 
  });
  retVal += '</' + $schemes.attr('name') + '>';

  // □備考をXMLに変換する。
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

/// @summary ファイルを添付する
/// @param $i_attachements 添付部 <div name="attachements">
/// @param i_url ファイルURL
NoteItem.AttachFile = function ($i_attachments, i_url)
{
  //alert('NoteItem.AttachFile ' + i_url);
  // 画像を添付する。（ダブルクリック時、別画面で画像を表示する。）
  $img = $('<a href="' + i_url + '" target="_blank"><img class="attachment" src="' + i_url + '" /></a>');
  $i_attachments.append($img);   

  // 画像が右クリックされたら、コンテキストメニューを表示する。   
  $img.bind("contextmenu", function(event){

    $ctx = $('<ul id="ctx"><!--li id="ctxEdit" disabled>編集</li--><li id="ctxDel">削除</li></ul>');
    $(this).after($ctx);

    // 削除を選択時、画像を削除する。
    $ctx.children('#ctxDel').mousedown(function () { $(this).parent().prev().remove(); });
    // マウスダウン時、コンテキストメニューを閉じる。
    $(document).mousedown(function(){ $ctx.hide(); $ctx.remove(); });

    // コンテキストメニューを表示する。
    var imagePosX = $(this).position().left, imagePosY = $(this).position().top;console.log(imagePosX + ',' + imagePosY);
    var posX = imagePosX + event.offsetX, posY =  imagePosY + event.offsetY; console.log(posX + ',' + posY);
    $ctx.css('left', posX).css('top', posY).show();

    // 通常の右クリック操作をOFFに設定する。
    return false;
  });
}

// /// @summary 公式メソッド
// NoteItem.prototype.publicMethod = function() {
//   console.log("NoteItem's publicMethod");
// };


