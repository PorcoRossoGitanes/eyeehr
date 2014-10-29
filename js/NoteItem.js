// ノートアイテムクラス
function NoteItem() {
  // メンバ変数の初期化
  this._name = 'NoteItem';

  // @param 付箋のID(MAX値)
  const MAX = 9999999999;
  
  // @param 付箋のID
  var id = /*'ID' +*/ Math.round(Math.random() * MAX);

  // 付箋（JQuery オブジェクト）を生成する 。
  const uploadFileToXmlDb = "/exist/apps/eyeehr/modules/upload.xq";
  
  // 画像の保存先を設定する。
  // TODO : 画像の保存先はカルテのフォルダの直下のimgコレクションとする。（後で対応）
  const saveImageTo = '/db/apps/eyeehr/img';
  var iframetarget = 'uploadImage-' + id;
  $jquery = $(
    '<div ' + 
    'id="' + id + '" ' + 
    'class="' + 'NoteItem' + '" ' + 
    '>' + 
    <!--削除ボタン-->
    '<button id="del" class="btn btn-default btn-xs">' + 
    '<span class="glyphicon glyphicon-remove"></span>' +
    '</button>' + 
    <!--最小化ボタン-->
    '<button id="min" class="btn btn-default btn-xs">' + 
    '<span class="glyphicon glyphicon-minus"></span>' + 
    '</button>' + 
    <!--☆ボタン-->
    '<button id="starred" class="btn btn-default btn-xs" onclick="$(this).text(\'☆\')">' + 
    '★<!--span class="glyphicon glyphicon-remove"></span-->' + 
    '</button>' + 
//---画像　　添付---
    <!--画像ファイル添付ボタン-->
    <!--画像ファイル入力フォーム-->
    '<form ' + 
    'id="attachImgForm" ' + 
    'enctype="multipart/form-data" ' + 
    'method="post" ' +
    'action="' + uploadFileToXmlDb + '" ' + 
    'target="' + iframetarget + '"' + 
    'style="display:none" ' + 
    '>' +
    '<input id="attachImg" type="file" name="file" value="" title="ファイルを添付します。"' + 
    'style="display:none" accept="image/jpeg, image/png, image/bmp, application/pdf" ' + 
    '/>' +
    '<input type="input" name="collection" value="' + saveImageTo + '"/>' + 
    '<input type="input" name="type" value="bin"/>' + 
    '<input id="attachImgSubmit" type="submit" value="submit" />' +
    '</form>' +
    '<iframe name="' + iframetarget + '" style="display:none"></iframe>' + //結果表示用iframe
    <!--画像選択ボタン（可視）-->
    '<button id="attachImg" ' + 
    'class="btn btn-default btn-xs" >' + 
    '<span class="glyphicon glyphicon-upload"></span>' + 
    '</button>' + 
//---画像　　添付---
//---シェーマ添付---
    <!--シェーマ追加ボタン（可視）-->
    '<button id="addScheme" ' + 
    'class="btn btn-default btn-xs" >' + 
    '<span class="glyphicon glyphicon-upload"></span>' + 
    '</button>' + 
//---シェーマ添付---
    <!--タグ表示用(初期：非表示)-->
    '<div id="tags" style="display:block"></div>' +
    <!--入力フォーム-->
    '<div name="formats"></div>' +
    <!--ファイル添付用-->
    '<div name="attachments">' + 
    '</div>' +
    <!--文字列入力用--> 
    '<div name="remarks"></div>' + 
    '</div>'
  );

  // 付箋をリサイズ・ドラッグ可能とする。
  //$jquery.resizable({handles : 's'});
  //$jquery.draggable();

  /// @summary 画像を追加する。
  $jquery.find('button#attachImg').click(function () {
    // 画像選択ボタンを取得する。
    $inputAttachImage = $(this).parent().find('form > input#attachImg');
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

  /// @summary  画像添付（送信）処理が実施され、
  ///           iframeがロードされたとき、
  ///           成功時は画像を表示する。
  $jquery.find('iframe').load(function(){
    var file = $(this).parent().find("#attachImg").val();
    var url =  $(this).contents().find('#url').text();
    if (file == "")
    {
      // 画像ファイルが指定されていない場合は処理を実行しない。
    }
    else if (file != ""　&& url == "")
    {
      // 画像ファイルが指定されているが、URLが未指定の場合、保存に失敗したと見なす。
      alert('ファイルの保存に失敗しました。');
    }
    else 
    {
      $(this).parent().find('[name=attachments]').append(
        '<a href="' + url + '" target="_blank">' + 
        '<img src="' + url + '" width="25%" ondblclick="$(this).remove()" />' + 
        '</a>'
      );      
    }
  });

  /// @summary シェーマ画像を追加する。
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
    var command = 'add';

    var url = MethodDrawPath + '?command=add&id=' + noteItemId;

    // Method Drawを開く。
    window.open(url, '', 'width=' + methodDrawWidth + ',height=' + methodDrawHeight);
  });

  // @summary 「最小化」ボタンの押下時、タグのみ表示、または詳細（タグ以外）を表示する。
  $jquery.find('#min').click(function()
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
  $jquery.find('#del').click(function(){
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
})();
   
/// @summary  付箋コンテナHTMLをXMLに保存する。
/// @param    $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return   保存用XML
NoteItem.HtmlToXml = function($i_jquery)
{
  var retVal = '';

  var tag = $i_jquery.attr('name');

  retVal += '<' + tag + ' id=\'' + $i_jquery.attr('id') +'\'>';

  //$i_jquery.find('del')
  //$i_jquery.find('min')
  //$i_jquery.find('attachImg')
  
  // □フォーム部
  $formats = $i_jquery.children('[name=formats]');
  retVal += '<' + $formats.attr('name') + '>';
  $i_jquery.children('[name=formats]').find('DIV', 'INPUT', 'IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
    //console.log($(this));
  });
  retVal += '</' + $formats.attr('name') + '>';

  // □画像添付部
  $attachments = $i_jquery.children('[name=attachments]');
  retVal += '<' + $attachments.attr('name') + '>';
  $attachments.find('IMG').each(function(){
    retVal += Utility.HtmlMinInputItemToXml($(this));
    console.log($(this));
  });
  retVal += '</' + $attachments.attr('name') + '>';

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


// @sumamry 病名
function NoteItemDisease() {
    // 親クラス(Parent)のメンバ変数を継承
    NoteItem.call(this);
    //--JQuery オブジェクト操作---//
    // クラス属性を追加した。
    $jquery.attr('name', 'NoteItemDisease');
    $jquery.addClass('NoteItemDisease');

    //--JQuery オブジェクト操作---//
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemDisease.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemDisease.prototype;
    
    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormats = function (i_name)
    {
      $jquery.find('[name=formats]').append(
        '<div name="disease-name">' + i_name + '</div>' 
      );
    }

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }

    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemDisease';
    };
})();



///@summary 主訴クラス
function NoteItemComplaint() 
{
  // 親クラス(Parent)のメンバ変数を継承
  NoteItem.call(this);

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemComplaint');
  $jquery.addClass('NoteItemComplaint');
  
  //--JQuery オブジェクト操作---//
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemComplaint.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemComplaint.prototype;

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          // 定型フォーマット部分を追加する。
          $jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }
    // メンバメソッド(オーバーライド)
    _proto.getName = function() 
    {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemComplaint';
    };
})();

///@summary 検査クラス
function NoteItemMedicalCheck() 
{
  NoteItem.call(this);

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMedicalCheck');
  $jquery.addClass('NoteItemMedicalCheck');
  //--JQuery オブジェクト操作---//
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemMedicalCheck.prototype;

        ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }

    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormats = function (i_name)
    {
      $jquery.find('[name=formats]').append(
        '<div name="medical-check-name">' + i_name + '</div>' + 
        '<input name="medical-check-custom" type="text" value="入力欄（カスタム）"/>'  
        // TODO : 入力欄カスタム作成
      );
    }

    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemMedicalCheck';
    };
})();

///@summary 処方クラス
function NoteItemPrescription() 
{
  NoteItem.call(this);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemPrescription');
  $jquery.addClass('NoteItemPrescription');
  //$jquery.find('[name=formats]').attr('name', 'medicine');

  //console.log($jquery);
  //--JQuery オブジェクト操作---//
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemPrescription.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemPrescription.prototype;

    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormats = function (i_name)
    {
      $jquery.find('[name=formats]').append(
        '<input name="medicine-orca" type="hidden" value="ORCAID" />' + 
        '<input name="medicine-name" type="disable" value="' + i_name +'"/>' + 
        '<input name="medicine-cnt"  type="text" value="1">個'
      );
    }

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }

    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemPrescription';
    };
})();


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
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemOperation.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemOperation.prototype;

    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }

    ///@summary 定型フォーマットを設定する。
    ///@param $i_name 名前
    _proto.setFormats = function (i_name)
    {
      $jquery.find('[name=formats]').append(
        '<div name="operation-name">' + i_name + '</div>' + 
        '<input name="operation-custom" type="text" value="入力欄（カスタム）"/>'  // TODO : 入力欄カスタム作成
      );
    }

    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemOperation';
    };
})();


///@summary メモコンストラクタ
///@param $i_xml XML
function NoteItemMemo() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemMemo');
  $jquery.addClass('NoteItemMemo');
  //console.log($jquery);

  //--JQuery オブジェクト操作---//

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItem.prototype;
    NoteItemMemo.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemMemo.prototype;
    ///@summary XMLを設定する。
    ///@param $i_xml XMLオブジェクト
    _proto.setByXml = function ($i_xml)
    {
      if ($i_xml !== undefined)
      {
        if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
        {
          //console.log($i_xml);
          // TODO : 定型フォーマット部分を追加する。
          //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
          // 画像添付部分を追加する。
          $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
          // 備考部分を追加する。
          $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
        }
      }
    }
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        var name = _super.getName.call(this);
        // 結果に'-child'を付け加える
        return name + ' ' + 'NoteItemMemo';
    };
})();

///@summary シェーマコンストラクタ
///@param $i_xml XML
function NoteItemScheme() 
{
  NoteItem.call(this/*, i_text*/);  // 入力文字列

  //--JQuery オブジェクト操作---//
  // クラス属性を追加した。
  $jquery.attr('name', 'NoteItemScheme');
  $jquery.addClass('NoteItemScheme');
  //console.log($jquery);

  //--JQuery オブジェクト操作---//

};(function() {
  // 親クラス(Parent)のメソッドを継承
  var Super = function Super(){};
  Super.prototype = NoteItem.prototype;
  NoteItemScheme.prototype = new Super();
  var _super = Super.prototype;
  // プロトタイプ
  var _proto = NoteItemScheme.prototype;
  
  ///@summary XMLを設定する。
  ///@param $i_xml XMLオブジェクト
  _proto.setByXml = function ($i_xml)
  {
    if ($i_xml !== undefined)
    {
      if ($i_xml[0].tagName == $jquery.attr('name').toUpperCase())
      {
        //console.log($i_xml);
        // TODO : 定型フォーマット部分を追加する。
        //$jquery.find('[name=formats]').html($i_xml.children('formats').html());
        // 画像添付部分を追加する。
        $jquery.find('[name=attachments]').html($i_xml.children('attachments').html());
        // 備考部分を追加する。
        $jquery.find('[name=remarks]').html($i_xml.children('remarks').html());
      }
    }
  }
  // メンバメソッド(オーバーライド)
  _proto.getName = function() {
      // 親クラス(Parent)のgetName()を呼び出す
      var name = _super.getName.call(this);
      // 結果に'-child'を付け加える
      return name + ' ' + 'NoteItemScheme';
  };
})();
