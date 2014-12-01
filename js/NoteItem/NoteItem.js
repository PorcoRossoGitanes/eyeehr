/**
 * ノートアイテムクラス
 * @class NoteItem
 * @constructor
 */
 function NoteItem() {
  // メンバ変数の初期化
  this._name = 'NoteItem';

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;


  /**
   * ID
   * @type {String}
   */
  this._id = /*'ID' +*/ Math.round(Math.random() * MAX);

  /**
   * タイトル
   * @type {String}
   */
   this._title = '';

  // 付箋（JQuery オブジェクト）を生成する 。
  const uploadFileToXmlDb = "/exist/apps/eyeehr/modules/uploadFileBin.xq";
  
  // 画像の保存先を設定する。
  // TODO : 画像の保存先はカルテのフォルダの直下のimgコレクションとする。（後で対応）
  const saveImageTo = '/db/apps/eyeehr/img';

  /*** 画像ファイル入力フォーム ***/
  const Extension = 
    'text/plain' + ', ' + 
    'text/csv' + ', ' + 
    'image/jpeg' + ', ' + 
    'image/png' + ', ' + 
    'image/bmp' + ', ' + 
    'application/pdf' + ', ' + 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' + ', ' + // docx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' + ', ' + // xlsx
    'application/msexcel' + ', ' + // xls
    'application/msword'  // doc
  ;
  var iframetarget = 'uploadImage-' + this._id;
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
  '<input id="attachFile" type="file" name="file" value="" accept="' + Extension + '" />' +
  '<input type="input" name="collection" value="' + saveImageTo + '"/>' + 
  '<input id="attachFileSubmit" type="submit" value="submit" />' +
  '</form>' +
    '<iframe name="' + iframetarget + '" style="display:none"></iframe>'; //結果表示用iframe
    /*** 画像ファイル入力フォーム ***/

  /**
   * @param {Object} JQuery オブジェクト
   */
   this._jquery = $(
    '<div ' + 
    'id="' + this._id + '" ' + 
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
    /***シェーマ　添付（処置・手術・検査などでシェーマを書くので、デフォルト表示とする。）***/
    '<button id="addScheme" class="btn btn-default btn-xs" style="visibility:inherit">シェーマ</button>' + 
    /***備考　編集***/
    '<button id="editRemark" class="btn btn-default btn-xs" style="visibility:inherit">備考</button>' + 
    '<div id="tags" style="display:block"></div>' +   <!--タグ表示用(初期：非表示)-->
    '<div name="Title" style="display:block"></div>' + <!--入力フォーム（タイトル）-->
    '<div name="Orca" style="display:block"></div>' + <!--入力フォーム（ORCA連携用定型フォーム）-->
    '<div name="Format"></div>' +                    <!--入力フォーム（定型フォーム）-->
    '<div name="Attachment"></div>' +                <!--ファイル添付用--> 
    '<div name="Scheme"></div>' +                    <!--シェーマ添付用--> 
    '<div name="Remark"></div>' +                    <!--備考入力用--> 
    '</div>'
    )[0];

  // 付箋をリサイズ・ドラッグ可能とする。
  //$(this._jquery).resizable({handles : 's'});
  //$(this._jquery).draggable();

  /// @summary 画像を追加する。
  $(this._jquery).find('button#attachFile').click(function () {
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
  $(this._jquery).find('iframe').load(function()
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
      NoteItem.AttachFile($(this).parent().find('[name="Attachment"]'), url);
    }
  });

  /// @summary シェーマ画像を追加するために、シェーマ描画ツールを表示する。
  $(this._jquery).find('button#addScheme').click(function () {

    // NoteItemのIDを取得する。
    var noteItemId = $(this).parent().attr('id');
  
    // URLを作成する。
    var url = saveImageTo +'/' +　'scheme-' + (new Date()).getTime() +'.svg';
  
    // シェーマを開く。
    NoteItem.OpenMethodDraw('add', noteItemId, url);

  });

  /// @summary 「最小化」ボタンの押下時、タグのみ表示、または詳細（タグ以外）を表示する。
  $(this._jquery).find('button#min').click(function()
  {
    // タグが表示の場合は折り畳む（最小化する）。タグが非表示の場合は展開する。
    if ($(this).parent().find('#tags').css('display') != 'block')
    {
      // 特記事項が表示されている場合は、文字列を非表示とする。
      $(this).parent().find('#tags').show();
      $(this).parent().find('[name="Orca"]').hide();      
      $(this).parent().find('[name="Format"]').hide();      
      $(this).parent().find('[name="Attachment"]').hide();      
      $(this).parent().find('[name="Scheme"]').hide();      
      $(this).parent().find('[name="Remark"]').hide();      
    }
    else
    {
      // 特記事項が非表示の場合は、文字列を表示する。
      $(this).parent().find('#tags').hide();
      $(this).parent().find('[name="Orca"]').show();
      $(this).parent().find('[name="Format"]').show();
      $(this).parent().find('[name="Attachment"]').show();
      $(this).parent().find('[name="Scheme"]').show();
      $(this).parent().find('[name="Remark"]').show();
    }
  });

  //　@summary 「削除」ボタンが押されたときには、付箋を削除する。
  $(this._jquery).find('button#del').click(function(){
    $(this).parent().remove();
  });
  
  // @summary 「備考」ボタンが押された時に備考編集フォームを表示する。
  $(this._jquery).find('button#editRemark').click(function(){
    $noteItem = $(this).parent();
    var content = $noteItem.find('[name="Remark"]').html();
    var noteItemId = $noteItem.attr('id');
    NoteItem.OpenRemarkForm(noteItemId, content);
  });

  // $(this._jquery).find('[name="Attachment"]').change(function(){
  //   alert('changed');
  // });
};(function() {

  // プロトタイプ
  var _proto = NoteItem.prototype;
  // メンバメソッド

  /**
   * クラス名（親クラス...現在のクラス）を取得する
   * @method getName
   * @return {String} クラス名（親クラス...現在のクラス）
   */ 
  _proto.getName = function() {
    return this._name;
  };

  /**
   * 付箋をカルテ上に登録する
   * @param i_to 貼付先
   */
   _proto.appendTo = function(i_to)
   {
    // 付箋をカルテ欄に登録する。
    $(this._jquery).appendTo(i_to);  
    $(this._jquery).dblclick();
  }

  /**
   * JQueryObjectを出力する
   * @return {JQuery Object} JQuery Object
   */
   _proto.getJQueryObject = function () 
   {
    return $(this._jquery);
  }

  /**
   * XMLを設定する。
   * @param $i_xml XMLオブジェクト
   */
   _proto.setByXml = function ($i_xml)
   {
    if ($i_xml !== undefined)
    {
      // タイトル部分を追加する。
      this.setTitle(Utility.InnerXml($i_xml.children('Title')));
      // ORCA情報部分を追加する。
      this.setOrca(($i_xml.children('Orca'))[0]);
      // TODO : 定型フォーマット部分を追加する。
      //$(this._jquery).find('[name="Format"]').html($i_xml.children('Format').html());
      // 添付ファイルを追加する。
      this.setAttachment($i_xml.children('Attachment')[0]);
      // シェーマ部分を追加する。
      this.setScheme($i_xml.children('Scheme')[0]);
      // 備考部分を追加する。
      this.setRemark($i_xml.children('Remark')[0]);
    }
  }

  /**
   * タイトルを設定する。
   * @method setTitle
   * @param {String} i_title タイトル
   */
   _proto.setTitle = function (i_title)
   {
    $(this._jquery).find('[name="Title"]').text(i_title); 
  }

  /**
   * ORCA情報を設定する。
   * @param {String/Object} i_xml ORCA情報 <Orca/>
   */
   _proto.setOrca = function (i_xml)
   {
    if ($(i_xml).children().length > 0)
    {
      //console.log(i_xml);
      if (i_xml !== undefined)
      {
        const NameMedicalClass = 'Medical_Class';
        const NameMedicationCode = 'Medication_Code';
        const NameMedicationName = 'Medication_Name';
        const NameMedicationNumber = 'Medication_Number';
        const NameMecicationGenericFlg = 'Medication_Generic_Flg';
        const NameMedicationUnitPoint = 'Medication_Unit_Point';
        const NameMedicationUnit = 'Medication_Unit';

        $(this._jquery).find('[name="Orca"]').append(
          '<table class="Orca">' +
          '<tbody>' + 
          '<tr>' + 
          '<td><div name="' + NameMedicalClass + '" style="display:none">' + $(i_xml).children(NameMedicalClass).text() + '</div></td>' +
          '<td><div name="' + NameMedicationCode + '" style="display:none">' + $(i_xml).children(NameMedicationCode).text() + '</div></td>' + 
          '<td><div name="' + NameMedicationName + '" style="display:none">' + $(i_xml).children(NameMedicationName).text() +'</div></td>' + 
          '<td>' + 
          '<input name="' + NameMedicationNumber +'"  type="text" ' + 
          'value="' + ($(i_xml).children(NameMedicationNumber).text() == '' ? 1 : $(i_xml).children(NameMedicationNumber).text()) + '"' + 
          '/>' + 
          '</td>' + 
          '<td><div name="' + NameMedicationUnit + '" style="display:inherit">' + $(i_xml).children(NameMedicationUnit).text() + '</div></td>' + 
          '<td><div name="' + NameMedicationUnitPoint +'"  style="display:none">' + $(i_xml).children(NameMedicationUnitPoint).text() + '</div></td>' + 
          '</tr>' + 
          '</tbody>' + 
          '</table>' //+
          );     
}
}
}

  /**
   * 定型フォーマットを設定する。
   * @method setFormat
   */
   _proto.setFormat = function ()
   {
    $(this._jquery).find('[name="Format"]').append(
      '<input name="Custom" type="text" value="" style="width:100%" />'  
      + ''
      );
  }

  /**
   * 添付ファイルを設定する。
   * @param {String/Object} i_xml 添付ファイル情報 <Attachment/>
   */
   _proto.setAttachment = function (i_xml)
   {
    $parent = $(this._jquery).find('[name="Attachment"]');
    $(i_xml).children().each(function(){ 
      var file = NoteItem.CreateAttachmentGadget(this, false); 
      $parent.append(file);
    });
  }

  /**
   * シェーマを設定する。
   * @param {String/Object} i_xml シェーマ情報 <Scheme />
   */
   _proto.setScheme = function (i_xml)
   {
    $parent = $(this._jquery).find('[name="Scheme"]');
    $(i_xml).children().each(function(){ 
      var file = NoteItem.CreateAttachmentGadget(this, true); 
      $parent.append(file);
    });
  }

  /**
   * 備考を設定する。
   * @param {String/Object} i_xml 備考情報 <Remark />
   */
   _proto.setRemark = function (i_xml)
   {
    $(this._jquery).find('[name="Remark"]').html(Utility.InnerXml($(i_xml))/* html */);
  }
})();


/**
 * 付箋コンテナHTMLをXMLに保存する。
 * @static
 * @method HtmlToXml
 * @param    $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
 * @return   保存用XML
 */
 NoteItem.HtmlToXml = function($i_jquery)
 {
  var retVal = '';

  var tag = $i_jquery.attr('name');

  retVal += '<' + tag + ' id="' + $i_jquery.attr('id') +'">';

  //$i_jquery.find('del')
  //$i_jquery.find('min')
  //$i_jquery.find('attachFile')
  
  // □タイトルをXMLに変換する。
  $title = $i_jquery.children('[name="Title"]');
  retVal += '<' + $title.attr('name') + '>' + $title.text() + '</' + $title.attr('name') + '>';
  // retVal += '<' + $title.attr('name') + '>';
  // $i_jquery.children('[name="Title"]').find('DIV', 'INPUT', 'IMG').each(function(){
  //   retVal += Utility.HtmlMinInputItemToXml(this);
  // });
  // retVal += '</' + $title.attr('name') + '>';

  // □ORCAフォーマット部をXMLに変換する。
  $orca = $i_jquery.children('[name="Orca"]');
  //console.log($orca[0]);
  retVal += '<' + $orca.attr('name') + '>';
  $orca.find('DIV').each(function(){ retVal += Utility.HtmlMinInputItemToXml(this); console.log(this);});
  $orca.find('INPUT').each(function(){ retVal += Utility.HtmlMinInputItemToXml(this); console.log(this);});
  retVal += '</' + $orca.attr('name') + '>';

  // □ORCAフォーマット部をXMLに変換する。
  $format = $i_jquery.children('[name="Format"]');
  retVal += '<' + $format.attr('name') + '>';
  // $i_jquery.children('[name="Format"]').find('DIV', 'INPUT', 'IMG').each(function(){
  //   console.log(this);
  //   retVal += Utility.HtmlMinInputItemToXml(this);
  //   console.log(Utility.HtmlMinInputItemToXml(this));
  // });
  retVal += '</' + $format.attr('name') + '>';

  // □画像添付部をXMLに変換する。
  $attachment = $i_jquery.children('[name="Attachment"]');
  retVal += '<' + $attachment.attr('name') + '>';
  $attachment.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml(this);
  });
  retVal += '</' + $attachment.attr('name') + '>';

  // □シェーマ添付部をXMLに変換する。
  $scheme = $i_jquery.children('[name="Scheme"]');
  retVal += '<' + $scheme.attr('name') + '>';
  $scheme.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml(this); 
  });
  retVal += '</' + $scheme.attr('name') + '>';

  // □備考をXMLに変換する。
  $Remark = $i_jquery.children('[name="Remark"]');
  retVal += '<' + $Remark.attr('name') + '>';
  retVal += Utility.HtmlToXhtml ($Remark.html());
  retVal += '</' + $Remark.attr('name') + '>';
  
  retVal += '</' + tag + '>';

  return retVal;
}

/**
 * 備考内容（文字列）を変更する。
 * @method ChangeRemark
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_content 備考
 * @param {method()} callback コールバック関数 
 * @static
 */
 NoteItem.ChangeRemark = function(i_noteItemId, i_content, callback)
 {
  $jquery = $('#' + i_noteItemId);

  $memo = $('<memo>' + i_content + '</memo>');
  $strongs = $memo.find('strong');

  var tags = '';
  for (index = 0; index < $strongs.length; index++)
  {
    tags += $($strongs[index]).text() + 
    (index == ($strongs.length - 1) ? '' : ',');
    //console.log($($strongs[index]).text());
  }
  
  $jquery.find('#tags').html(tags);
  $jquery.find('[name="Remark"]').html(i_content);

  if(callback !== undefined) callback();
}

/**
 * ファイルを添付する
 * @static
 * @param $i_attachements 添付部 <div name="Attachment" />
 * @param i_url ファイルURL
 */
 NoteItem.AttachFile = function ($i_attachment, i_url)
 {
  // サムネイルを表示できない場合はNoImageアイコンを表示する。
  // https://www.iconfinder.com/iconsets/lexter-flat-colorfull-file-formats
  const DOCX = '/exist/rest/db/apps/eyeehr/img/NoImage/DOCX/NoImage.png' 
  const XLSX = '/exist/rest/db/apps/eyeehr/img/NoImage/XLSX/NoImage.png' 
  const PDF = '/exist/rest/db/apps/eyeehr/img/NoImage/PDF/NoImage.png' 
  const TEXT = '/exist/rest/db/apps/eyeehr/img/NoImage/TXT/NoImage.png' 
  const CSV = '/exist/rest/db/apps/eyeehr/img/NoImage/CSV/CSV.png' 
  var ext = Utility.GetFileExt(i_url);  // console.log(ext);
  var src = i_url; 
  switch (ext)
  {
    case 'doc' : 
    case 'docx' : 
      src = DOCX;
    break;
    case 'xls' : 
    case 'xlsx' : 
      src = XLSX;
    break;
    case 'pdf' : 
      src = PDF; 
    break;
    case 'txt' : 
      src = TEXT;
    break;
    case 'csv' :
      src = CSV;
    break;
    default:
    break;
  } 

  // 画像を添付する。（ダブルクリック時、別画面で画像を表示する。）
  var filename = Utility.GetFileName(i_url, true);
  var html = '<img class="attachment img-thumbnail" src="' + src + '" data-src="' + i_url + '" alt="' + filename + '"/>';
  var img = NoteItem.CreateAttachmentGadget($(html)[0], false);
  $i_attachment.append(img);   
}

/**
 * シェーマを追加する。
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_url 画像URL
 * @param {function()} コールバック関数
 */
NoteItem.AttachScheme = function (i_noteItemId, i_url, callback)
{
  // 親画面にシェーマ画像のタグを返却する。
  $noteItem = $('#' + i_noteItemId); 

  // シェーマ領域を取得する。
  $scheme = $noteItem.children('[name="Scheme"]'); 

  // 元画像を取得し、一度削除、再度追加する。
  $imgs = $scheme.children("img[src^='" + i_url + "']");
  if ($imgs.length > 0) { $imgs.remove(); } 
  var src = i_url;
  var filename = Utility.GetFileName(i_url, true);
  var html = '<img class="scheme img-thumbnail" src="' + src + '" data-src="' + i_url + '" alt="' + filename + '"/>';
  var img = NoteItem.CreateAttachmentGadget($(html)[0], true);
  $scheme.append(img);

  // 画像が表示されない場合があるため、画像をリロードする。
  $(img).ready(function(){$(img).attr('src', i_url + '?' + (new Date().getTime()))});

  // 完了メッセージを表示する。
  alert('画像の保存が完了しました。');

  // コールバック関数があれば、コールバック関数を実行する。
  if(callback) callback(); 
}

/**
 * MethodDrawを開く
 * @param {String} i_mode add=新規追加, edit=編集
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_to 保存先
 */
NoteItem.OpenMethodDraw = function(i_mode, i_noteItemId, i_url)
{
  Utility.LoadJson(function(json){
    // @param {Number} Meethod DrawのURL(相対パス)
    const MethodDrawPath = './method_draw/editor/index.html';

    // @param {Number} Method Drawの画面 最大サイズ　幅
    const MethodDrawWidthMax = json['SchemeDrawer'].Size['max_width'];
    // @param {Number} Method Drawの画面 最大サイズ　高さ
    const MethodDrawHeightMax = json['SchemeDrawer'].Size['max_height'];

    // @param {Number} Method Drawの画面　幅
    var methodDrawWidth = window.parent.screen.width > MethodDrawWidthMax ? MethodDrawWidthMax : window.parent.screen.width;
    // @param {Number} Method Drawの画面　高さ
    var methodDrawHeight = window.parent.screen.height > MethodDrawHeightMax ? MethodDrawHeightMax : window.parent.screen.height;

    // Method Drawを開く。
    var url = MethodDrawPath + '?command=' + i_mode + '&id=' + i_noteItemId + '&image=' + i_url;
    var name = 'method_draw_' + (new Date().getTime());
    window.open(url, name, 'width=' + methodDrawWidth + ',height=' + methodDrawHeight);
  });

}

/**
 * 備考入力フォームを開く
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_content 備考内容
 */
NoteItem.OpenRemarkForm = function(i_noteItemId, i_content)
{
  Utility.LoadJson(function(json){
    var url = 'remark.html' + '?' + 'id=' + i_noteItemId + '&' + 'content=' + i_content;
    var id = 'remark_'+ i_noteItemId;
    var size = 'width=' + json['Remark'].Size['width'] + ',height=' + json['Remark'].Size['height'];
    window.open(url, id, size);    
  });
}

/**
 * 画像ファイルにはリンクを復活する。
 * @param  String/Object  i_xml 添付ファイル（img）
 * @return Object         添付ファイル（部品）（img）
 */
NoteItem.CreateAttachmentGadget = function (i_xml, i_editable) 
{
  var ret = null;
  const thumbnailPdf = '';
  var url  = $(i_xml).data('src');
  var html = Utility.XmlToStr(i_xml);

  ret = $(html)[0];

  // 画像が右クリックされたら、コンテキストメニューを表示する。   
  $(ret).bind("contextmenu", function(event){

    var html = '';
    html += '<ul id="ctx">';
    html += '<li id="ctxOpen">表示</li>';
    if (i_editable) html += '<li id="ctxEdit">編集</li>';
    html += '<li id="ctxReload">再読み込み</li>';
    html += '<li id="ctxDownload">ダウンロード</li>';
    html += '<li id="ctxDelete">削除</li>';
    html += '</ul>';

    $ctx = $(html);

    $(this).after($ctx);

    // 大きく表示を選択時、別ウィンドウでMethodDrawを開く。
    $ctx.children('#ctxOpen').mousedown(function(){
      window.open(url, 'scheme_' + (new Date().getTime()));
    });
    // 編集を選択時、シェーマツールを開く。
    $ctx.children('#ctxEdit').mousedown(function(){
      // シェーマを開く。
      $img = $(ctx).before();
      $scheme = $img.parent();
      $noteItem = $scheme.parent();
      var noteItemId = $noteItem.attr('id'); console.log($noteItem[0]);
      NoteItem.OpenMethodDraw('edit', noteItemId, url);
    });
    // 再読み込みを選択時、画像を再度読込む。
    $ctx.children('#ctxReload').mousedown(function(){
      $(ret).attr('src', url + '?' + (new Date().getTime()));
      Utility.ReloadImageFile(ret, url);
    });
    // ダウンロード選択時、ファイルをダウンロードする。
    $ctx.children('#ctxDownload').mousedown(function(){
      Utility.DownloadFile(url);  
    });
    // 削除を選択時、画像を削除する。
    $ctx.children('#ctxDelete').mousedown(function () { 
      $(this).parent().prev().remove(); 
    });

    // マウスダウン時、コンテキストメニューを閉じる。
    $(document).mousedown(function(){ $ctx.hide(); $ctx.remove(); });

    // コンテキストメニューを表示する。
    var imagePosX = $(this).position().left, imagePosY = $(this).position().top;console.log(imagePosX + ',' + imagePosY);
    var posX = imagePosX + event.offsetX, posY =  imagePosY + event.offsetY; console.log(posX + ',' + posY);
    $ctx.css('left', posX).css('top', posY).show();

    // 通常の右クリック操作をOFFに設定する。
    return false;
  });

  return ret;
}

