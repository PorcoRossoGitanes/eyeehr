/**
 * ノートアイテムクラス
 * @class NoteItem
 * @constructor
 */
var NoteItem = function() {

    // @param 付箋のID(MAX値)
    const MAX = 9999999999;

    /**
     * @property {String} _id ID
     */
    this._id = /*'ID' +*/ Math.round(Math.random() * MAX);

    /**
     * @property {String} _title タイトル
     */
    this._title = '';

    //--JQuery オブジェクト操作---//
    // 付箋（JQuery オブジェクト）を生成する 。
    const uploadFileToXmlDb = "/exist/apps/eyeehr/modules/uploadFileBin.xq";

    // 画像の保存先を設定する。
    // TODO : 画像の保存先はカルテのフォルダの直下のimgコレクションとする。（後で対応）
    const saveImageTo = '/db/apps/eyeehr/img';

    /*** 画像ファイル入力フォーム ***/
    var json = Config.Load();
    const Extension =
        (json.AttachFile.FileType.TXT.available ? json.AttachFile.FileType.TXT.access + ', ' : '') +
        (json.AttachFile.FileType.CSV.available ? json.AttachFile.FileType.CSV.access + ', ' : '') +
        (json.AttachFile.FileType.JPG.available ? json.AttachFile.FileType.JPG.access + ', ' : '') +
        (json.AttachFile.FileType.PNG.available ? json.AttachFile.FileType.PNG.access + ', ' : '') +
        (json.AttachFile.FileType.BMP.available ? json.AttachFile.FileType.BMP.access + ', ' : '') +
        (json.AttachFile.FileType.PDF.available ? json.AttachFile.FileType.PDF.access + ', ' : '') +
        (json.AttachFile.FileType.DOCX.available ? json.AttachFile.FileType.DOCX.access + ', ' : '') +
        (json.AttachFile.FileType.DOC.available ? json.AttachFile.FileType.DOC.access + ', ' : '') +
        (json.AttachFile.FileType.XLSX.available ? json.AttachFile.FileType.XLSX.access + ', ' : '') +
        (json.AttachFile.FileType.XLS.available ? json.AttachFile.FileType.XLS.access + '' /*', '*/ : '');

    var iframetarget = 'uploadImage-' + this._id;
    var formAttachFile = /*** 画像ファイル入力フォーム ***/
        '<form id="attachFileForm" method="post" enctype="multipart/form-data" action="' + uploadFileToXmlDb + '" target="' + iframetarget + '" style="display:none" >' +
        '<input type="input" name="type" value="bin"/>' +
        '<input type="file" name="file" value="" accept="' + Extension + '" />' +
        '<input type="input" name="collection" value="' + saveImageTo + '"/>' +
        '<input id="attachFileSubmit" type="submit" value="submit" />' +
        '</form>' +
        '<iframe name="' + iframetarget + '" style="display:none"></iframe>'; //結果表示用iframe

    /**
     * @property {Object} _jquery JQuery オブジェクト
     */
    this._jquery = $(
        '<div ' + 'id="' + this._id + '" ' + 'class="' + NoteItem.ClassName + '" ' + '>' +
        /*** 削除　ボタン ***/
        '<button id="del" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button>' +
        /*** 最小化ボタン ***/
        '<button id="min" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-minus"></span></button>' +
        /*** 　↑　ボタン ***/
        '<button id="up" class="btn btn-default btn-xs"><span class="glyphicon glyphicon glyphicon-arrow-up"></span></button>' +
        /*** 　↓　ボタン ***/
        '<button id="down" class="btn btn-default btn-xs"><span class="glyphicon glyphicon glyphicon-arrow-down"></span></button>' +
        /*** ファイル添付 ***/
        formAttachFile +
        /* 隠し埋め込みフォーム */
        '<button id="attachFile" class="btn btn-default btn-xs" ><span class="glyphicon glyphicon-upload"></span></button>' +
        /*** シェーマ描画 ***/
        '<button id="addScheme" class="btn btn-default btn-xs" style="visibility:inherit">シェーマ</button>' +
        /*** 備考　　編集 ***/
        '<button id="editRemark" class="btn btn-default btn-xs" style="visibility:inherit">備考</button>' +
        /*** タグ　表示用 ***/
        '<div id="tags" style="display:none"></div>' +
        /*** 入力：　タイトル　 ***/
        '<div name="Title"></div>' +
        /*** 入力：ORCA　　連携 ***/
        '<div name="Orca"></div>' +
        /*** 入力：定型　　書式 ***/
        '<div name="Format"></div>' +
        /*** 入力：ファイル添付 ***/
        '<div name="Attachment"></div>' +
        /*** 入力：シェーマ描画 ***/
        '<div name="Scheme"></div>' +
        /*** 入力：備考　　入力 ***/
        '<div name="Remark" style="word-wrap:break-word;"></div>' +
        '</div>'
    )[0];

    // 付箋をリサイズ・ドラッグ可能とする。
    //$(this._jquery).resizable({handles : 's'});
    //$(this._jquery).sortable();
    //$(this._jquery).draggable();

    /**
     * @event「ファイルアップロード」ボタンが押下された時
     * @summary ファイルを選択する。
     */
    $(this._jquery).find('#attachFile').click(function() {

        // 画像選択ボタンを取得する。
        $inputAttachImage = $(this).parent().find('form > input[type="file"]');

        // 画像選択ボタンをクリックする。
        $inputAttachImage.click();

        /**
         * @event 画像データが追加された場合
         * @summary 画像を追加する。
         */
        $inputAttachImage.change(function() {
            if ($(this).val() != "") {
                $form = $(this).parent();
                $form.submit();
            }
        });

    });

    /**
     * @event 添付ファイル保存処理が実施され、結果がiframeにロードされた時
     * @summary  添付ファイルを表示する。
     * iframeには、ファイルのimgタグが返却される。
     */
    $(this._jquery).find('iframe').load(function() {
        var file = $(this).parent().find('[type="file"]').val();
        var url = $(this).contents().find('#url').text();
        if (file == "") { /* 画像ファイルが指定されていない場合は処理を実行しない。 */ } 
        else if (url == "") { alert('ファイルの保存に失敗しました。'); } 
        else { NoteItem.AttachFile($(this).parent().find('[name="Attachment"]'), url); }
    });

    /**
     * @event 「シェーマ」ボタンの押下時
     * @summary シェーマ描画ツールを表示する。
     */
    $(this._jquery).find('#addScheme').click(function() {
        var noteItemId = $(this).parent().attr('id'); // NoteItemのIDを取得する。
        var url = saveImageTo + '/' + 　'scheme-' + (new Date()).getTime() + '.svg'; // URLを作成する。  
        NoteItem.OpenMethodDraw('add', noteItemId, url); // シェーマを開く。
    });

    /**
     * @event 「最小化」ボタンの押下時
     * @summary 最小化を切替える。
     */
    $(this._jquery).find('#min').click(function() {
        $(this).parent().find('#tags').toggle();
        $(this).parent().find('[name="Orca"]').toggle();
        $(this).parent().find('[name="Format"]').toggle();
        $(this).parent().find('[name="Attachment"]').hide();
        $(this).parent().find('[name="Scheme"]').toggle();
        $(this).parent().find('[name="Remark"]').toggle();
    });

    /**
     * @event 「↑」ボタンの押下時
     * @summary 一つ上に移動する。
     */
    $(this._jquery).find('#up').click(function() {
        $target = $(this).parent();
        $prev = $target.prev();
        if ($prev[0].tagName == $target[0].tagName) {
            $prev.before($target);
        }
    });

    /**
     * @event 「↓」ボタンの押下時
     * @summary 一つ下に移動する。
     */
    $(this._jquery).find('#down').click(function() {
        $target = $(this).parent();
        $next = $target.next();
        if ($next[0].tagName == $target[0].tagName) {
            $next.after($target);
        }
    });

    /**
     * @event 「削除」ボタンの押下時
     * @summary 付箋を削除する。
     */
    $(this._jquery).find('#del').click(function() {
        $(this).parent().remove();
    });

    /**
     * @event 「備考」ボタンの押下時
     * @summary 備考編集ツールを表示する。
     */
    $(this._jquery).find('#editRemark').click(function() {
        $noteItem = $(this).parent();
        var noteItemId = $noteItem.attr('id');
        var content = $noteItem.find('[name="Remark"]').html();
        NoteItem.OpenRemarkForm(noteItemId, content);
    });
    //--JQuery オブジェクト操作---//

};
(function() {

    /**
     * @param {Object} _proto プロトタイプ
     */
    var _proto = NoteItem.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        return NoteItem.ClassName;
    };

    /**
     * 付箋をカルテ上に登録する
     * @param i_to 貼付先
     */
    _proto.appendTo = function(i_to) {
        // 付箋をカルテ欄に登録する。
        $(this._jquery).appendTo(i_to);
        $(this._jquery).dblclick();
    }

    /**
     * JQueryObjectを出力する
     * @return {JQuery Object} JQuery Object
     */
    _proto.getJQueryObject = function() {
        return $(this._jquery);
    }

    /**
     * XMLを設定する。
     * @param $i_xml XMLオブジェクト
     */
    _proto.setByXml = function($i_xml) {
        if ($i_xml !== undefined) {
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
    _proto.setTitle = function(i_title) {
        $(this._jquery).find('[name="Title"]').text(i_title);
    }

    /**
     * ORCA情報を設定する。
     * @param {String/Object} i_xml ORCA情報 <Orca/>
     */
    _proto.setOrca = function(i_xml) {
        if ($(i_xml).children().length > 0) {
            //console.log(i_xml);
            if (i_xml !== undefined) {
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
                    '<td><div name="' + NameMedicationName + '" style="display:none">' + $(i_xml).children(NameMedicationName).text() + '</div></td>' +
                    '<td>' +
                    '<input name="' + NameMedicationNumber + '"  type="text" ' +
                    'value="' + ($(i_xml).children(NameMedicationNumber).text() == '' ? 1 : $(i_xml).children(NameMedicationNumber).text()) + '"' +
                    '/>' +
                    '</td>' +
                    '<td><div name="' + NameMedicationUnit + '" style="display:inherit">' + $(i_xml).children(NameMedicationUnit).text() + '</div></td>' +
                    '<td><div name="' + NameMedicationUnitPoint + '"  style="display:none">' + $(i_xml).children(NameMedicationUnitPoint).text() + '</div></td>' +
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
    _proto.setFormat = function() {
        $(this._jquery).find('[name="Format"]').append(
            '<input name="Custom" type="text" value="" style="width:100%" />' + ''
        );
    }

    /**
     * 添付ファイルを設定する。
     * @param {String/Object} i_xml 添付ファイル情報 <Attachment/>
     */
    _proto.setAttachment = function(i_xml) {
        $parent = $(this._jquery).find('[name="Attachment"]');
        $(i_xml).children().each(function() {
            var file = NoteItem.CreateAttachmentGadget(this, false);
            $parent.append(file);
        });
    }

    /**
     * シェーマを設定する。
     * @param {String/Object} i_xml シェーマ情報 <Scheme />
     */
    _proto.setScheme = function(i_xml) {
        $parent = $(this._jquery).find('[name="Scheme"]');
        $(i_xml).children().each(function() {
            var file = NoteItem.CreateAttachmentGadget(this, true);
            $parent.append(file);
        });
    }

    /**
     * 備考を設定する。
     * @param {String/Object} i_xml 備考情報 <Remark />
     */
    _proto.setRemark = function(i_xml) {
        $(this._jquery).find('[name="Remark"]').html(Utility.InnerXml($(i_xml)) /* html */ );
    }
})();

/**
 * NoteItemをHTMLをXMLに保存する。
 * @static
 * @method HtmlToXml
 * @param    $i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
 * @return   保存用XML
 */
NoteItem.HtmlToXml = function($i_jquery) {
    var retVal = '';

    var tag = $i_jquery.attr('name');

    retVal += '<' + tag + ' id="' + $i_jquery.attr('id') + '">';


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
    $orca.find('DIV').each(function() {
        retVal += Utility.HtmlMinInputItemToXml(this);
        console.log(this);
    });
    $orca.find('INPUT').each(function() {
        retVal += Utility.HtmlMinInputItemToXml(this);
        console.log(this);
    });
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
    $attachment.find('IMG').each(function() {
        retVal += Utility.HtmlMinInputItemToXml(this);
    });
    retVal += '</' + $attachment.attr('name') + '>';

    // □シェーマ添付部をXMLに変換する。
    $scheme = $i_jquery.children('[name="Scheme"]');
    retVal += '<' + $scheme.attr('name') + '>';
    $scheme.find('IMG').each(function() {
        retVal += Utility.HtmlMinInputItemToXml(this);
    });
    retVal += '</' + $scheme.attr('name') + '>';

    // □備考をXMLに変換する。
    $Remark = $i_jquery.children('[name="Remark"]');
    retVal += '<' + $Remark.attr('name') + '>';
    retVal += Utility.HtmlToXhtml($Remark.html());
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
NoteItem.ChangeRemark = function(i_noteItemId, i_content, callback) {
    $jquery = $('#' + i_noteItemId);

    $memo = $('<memo>' + i_content + '</memo>');
    $strongs = $memo.find('strong');

    var tags = '';
    for (index = 0; index < $strongs.length; index++) {
        tags += $($strongs[index]).text() +
            (index == ($strongs.length - 1) ? '' : ',');
    }

    $jquery.find('#tags').html(tags);
    $jquery.find('[name="Remark"]').html(i_content);

    if (callback !== undefined) callback();
}

/**
 * ファイルを添付する
 * @static
 * @param $i_attachements 添付部 <div name="Attachment" />
 * @param i_url ファイルURL
 */
NoteItem.AttachFile = function($i_attachment, i_url) {
    var json = Config.Load();
    // サムネイルを表示できない場合はNoImageアイコンを表示する。
    // https://www.iconfinder.com/iconsets/lexter-flat-colorfull-file-formats
    var ext = Utility.GetFileExt(i_url).toUpperCase(); // console.log(ext);
    var src = i_url;
    switch (ext) {
        case 'DOC': 
        case 'DOCX':
        case 'XLS': 
        case 'XLSX': 
        case 'PDF': 
        case 'TXT': 
        case 'CSV': 
            src = json.AttachFile.FileType[ext].noimage; 
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
NoteItem.AttachScheme = function(i_noteItemId, i_url, callback) {
    // 親画面にシェーマ画像のタグを返却する。
    $noteItem = $('#' + i_noteItemId);

    // シェーマ領域を取得する。
    $scheme = $noteItem.children('[name="Scheme"]');

    // 元画像を取得し、一度削除、再度追加する。
    $imgs = $scheme.children("img[src^='" + i_url + "']");
    if ($imgs.length > 0) {
        $imgs.remove();
    }
    var src = i_url;
    var filename = Utility.GetFileName(i_url, true);
    var html = '<img class="scheme img-thumbnail" src="' + src + '" data-src="' + i_url + '" alt="' + filename + '"/>';
    var img = NoteItem.CreateAttachmentGadget($(html)[0], true);
    $scheme.append(img);

    // 画像が表示されない場合があるため、画像をリロードする。
    $(img).ready(function() {
        $(img).attr('src', i_url + '?' + (new Date().getTime()))
    });

    // 完了メッセージを表示する。
    alert('画像の保存が完了しました。');

    // コールバック関数があれば、コールバック関数を実行する。
    if (callback) callback();
}

/**
 * MethodDrawを開く
 * @param {String} i_mode add=新規追加, edit=編集
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_to 保存先
 */
NoteItem.OpenMethodDraw = function(i_mode, i_noteItemId, i_url) {

    var json = Config.Load();

    // MethodDrawのURL(相対パス)
    const MethodDrawPath = json['SchemeDrawer'].Path;
    // MethodDrawの画面 最大サイズ　幅
    const MethodDrawWidthMax = json['SchemeDrawer'].Size['max_width'];
    // MethodDrawの画面 最大サイズ　高さ
    const MethodDrawHeightMax = json['SchemeDrawer'].Size['max_height'];

    // MethodDrawの画面　幅
    var methodDrawWidth = window.parent.screen.width > MethodDrawWidthMax ? MethodDrawWidthMax : window.parent.screen.width;
    // MethodDrawの画面　高さ
    var methodDrawHeight = window.parent.screen.height > MethodDrawHeightMax ? MethodDrawHeightMax : window.parent.screen.height;

    // Method Drawを開く。
    var url = MethodDrawPath + '?command=' + i_mode + '&id=' + i_noteItemId + '&image=' + i_url;
    var name = 'method_draw_' + (new Date().getTime());
    window.open(url, name, 'width=' + methodDrawWidth + ',height=' + methodDrawHeight);

}

/**
 * 備考入力フォームを開く
 * @param {String} i_noteItemId NoteItem ID
 * @param {String} i_content 備考内容
 */
NoteItem.OpenRemarkForm = function(i_noteItemId, i_content) {
    var json = Config.Load();
    var url = 'remark.html' + '?' + 'id=' + i_noteItemId + '&' + 'content=' + i_content;
    var id = 'remark_' + i_noteItemId;
    var size = 'width=' + json['Remark'].Size['width'] + ',height=' + json['Remark'].Size['height'];
    window.open(url, id, size);
}

/**
 * 画像ファイルにはリンクおよび右クリックメニュー（コンテキスト）を作成する。
 * @method CreateAttachmentGadget
 * @param  {String/Object}  i_xml 添付ファイル（img）
 * @return {Object}         添付ファイル（部品）（img）
 */
NoteItem.CreateAttachmentGadget = function(i_xml, i_editable) {

    var ret = null;
    var url = $(i_xml).data('src');
    var html = Utility.XmlToStr(i_xml);

    // 画像ファイルオブジェクトを格納する。
    ret = $(html)[0];

    /**
     * @summary 画像を別ウィンドウで開く。
     * @method open
     */
    function open() {
        window.open(url, 'img_' + (new Date().getTime()));
    }

    /**
     * @summary シェーマ描画ツールを開き、画像を編集する。
     * @method edit
     */
    function edit() {
        $scheme = $(ret).parent();
        $noteItem = $scheme.parent();
        var noteItemId = $noteItem.attr('id');
        console.log($noteItem[0]);
        NoteItem.OpenMethodDraw('edit', noteItemId, url);
    }

    /**
     * @summary 画像をリロードする。
     * @method reload
     */
    function reload() {
        $(ret).attr('src', url + '?' + (new Date().getTime()));
        Utility.ReloadImageFile(ret, url);
    }

    /**
     * @summary 画像をダウンロードする。
     * @method download
     */
    function download() {
        Utility.DownloadFile(url);
    }

    /**
     * @summary 画像を削除する。
     * @method remove
     */
    function remove() {
        $(this).parent().prev().remove();
    }

    // 画像がダブルクリックされた時
    // シェーマ(i_editable = true)の場合は、シェーマ描画ツールを表示する。
    // それ以外の場合は。別ウィンドウで表示する。
    $(ret).dblclick(function() {
        if (i_editable) {
            edit();
        } else {
            open();
        }
    });
    // 画像が右クリックされた時、コンテキストメニューを表示する。   
    $(ret).bind("contextmenu", function(event) {

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
        $ctx.children('#ctxOpen').mousedown(function() {
            open();
        });
        // 編集を選択時、シェーマツールを開く。
        $ctx.children('#ctxEdit').mousedown(function() {
            edit();
        });
        // 再読み込みを選択時、画像を再度読込む。
        $ctx.children('#ctxReload').mousedown(function() {
            reload();
        });
        // ダウンロード選択時、ファイルをダウンロードする。
        $ctx.children('#ctxDownload').mousedown(function() {
            download();
        });
        // 削除を選択時、画像を削除する。
        $ctx.children('#ctxDelete').mousedown(function() {
            remove();
        });

        // マウスダウン時、コンテキストメニューを閉じる。
        $(document).mousedown(function() {
            $ctx.hide();
            $ctx.remove();
        });

        // コンテキストメニューを表示する。
        var imagePosX = $(this).position().left,
            imagePosY = $(this).position().top;
        console.log(imagePosX + ',' + imagePosY);
        var posX = imagePosX + event.offsetX,
            posY = imagePosY + event.offsetY;
        console.log(posX + ',' + posY);
        $ctx.css('left', posX).css('top', posY).show();

        // 通常の右クリック操作をOFFに設定する。
        return false;
    });

    return ret;
}

/**
 * @property {String} ClassName クラス名
 * @static
 */
NoteItem.ClassName = 'NoteItem';
