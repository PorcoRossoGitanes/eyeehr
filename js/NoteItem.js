/**
 * ノートアイテムクラス
 * @class NoteItem
 */
function NoteItem() {
  // メンバ変数の初期化
  this._name = 'NoteItem';

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  
  // @param 付箋のID
  var id = /*'ID' +*/ Math.round(Math.random() * MAX);

  /**
   * @param {String} タイトル
   */
  this._title = '';

  // 付箋（JQuery オブジェクト）を生成する 。
  const uploadFileToXmlDb = "/exist/apps/eyeehr/modules/uploadFileBin.xq";
  
  // 画像の保存先を設定する。
  // TODO : 画像の保存先はカルテのフォルダの直下のimgコレクションとする。（後で対応）
  const saveImageTo = '/db/apps/eyeehr/img';

  /*** 画像ファイル入力フォーム ***/
  const Extension = 'image/jpeg, image/png, image/bmp, application/pdf, application/msexcel, application/msword';
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
  
  // @summary 付箋をダブルクリック時に入力欄を表示する。
  $(this._jquery).dblclick(function(){
    var memo = $(this).find('[name="Remark"]').html();
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
    $(this._jquery).find('[name="Attachment"]').html(Utility.InnerXml($(i_xml)));
  }

  /**
   * シェーマを設定する。
   * @param {String/Object} i_xml シェーマ情報 <Scheme />
   */
  _proto.setScheme = function (i_xml)
  {
    $(this._jquery).find('[name="Scheme"]').html(Utility.InnerXml($(i_xml)));
  }

  /**
   * 備考を設定する。
   * @param {String/Object} i_xml 備考情報 <Remark />
   */
  _proto.setRemark = function (i_xml)
  {
    $(this._jquery).find('[name="Remark"]').html(Utility.InnerXml($(i_xml)));
  }
})();


/**
 * 付箋コンテナHTMLをXMLに保存する。
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
  //   retVal += Utility.HtmlMinInputItemToXml($(this));
  // });
  // retVal += '</' + $title.attr('name') + '>';

  // □ORCAフォーマット部をXMLに変換する。
  $orca = $i_jquery.children('[name="Orca"]');
  //console.log($orca[0]);
  retVal += '<' + $orca.attr('name') + '>';
  $orca.find('DIV').each(function(){ retVal += Utility.HtmlMinInputItemToXml($(this)); console.log(this);});
  $orca.find('INPUT').each(function(){ retVal += Utility.HtmlMinInputItemToXml($(this)); console.log(this);});
  retVal += '</' + $orca.attr('name') + '>';

  // □ORCAフォーマット部をXMLに変換する。
  $format = $i_jquery.children('[name="Format"]');
  retVal += '<' + $format.attr('name') + '>';
  // $i_jquery.children('[name="Format"]').find('DIV', 'INPUT', 'IMG').each(function(){
  //   console.log(this);
  //   retVal += Utility.HtmlMinInputItemToXml($(this));
  //   console.log(Utility.HtmlMinInputItemToXml($(this)));
  // });
  retVal += '</' + $format.attr('name') + '>';

  // □画像添付部をXMLに変換する。
  $Attachment = $i_jquery.children('[name="Attachment"]');
  retVal += '<' + $Attachment.attr('name') + '>';
  $Attachment.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
  });
  retVal += '</' + $Attachment.attr('name') + '>';

  // □シェーマ添付部をXMLに変換する。
  $Scheme = $i_jquery.children('[name="Scheme"]');
  retVal += '<' + $Scheme.attr('name') + '>';
  $Scheme.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this)); 
  });
  retVal += '</' + $Scheme.attr('name') + '>';

  // □備考をXMLに変換する。
  $Remark = $i_jquery.children('[name="Remark"]');
  retVal += '<' + $Remark.attr('name') + '>';
  retVal += Utility.HtmlToXhtml ($Remark.html());
  retVal += '</' + $Remark.attr('name') + '>';
  
  retVal += '</' + tag + '>';

  return retVal;
}

/**
 * 文字列を変更する。
 */
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
  $jquery.find('[name="Remark]').html(i_memo);
}

/**
 * ファイルを添付する
 * @param $i_attachements 添付部 <div name="Attachment" />
 * @param i_url ファイルURL
 */
NoteItem.AttachFile = function ($i_attachment, i_url)
{
  // 画像を添付する。（ダブルクリック時、別画面で画像を表示する。）
  $img = $('<a href="' + i_url + '" target="_blank"><img class="attachment" src="' + i_url + '" /></a>');
  $i_attachment.append($img);   

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

