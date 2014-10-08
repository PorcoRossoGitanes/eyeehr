///@summary ノートアイテムコンテナ
///@param 	i_name	名前
///@param 	i_title	タイトル
function NoteItemContainer (i_name, i_title)
{
	///@param クラス名
	this._name = 'NoteItemContainer';
		
	///@param HTML
	$jqueryNoteItemContainer = $('<div ' + 
		'class="' + 'NoteItemContainer' + '" ' + 
		'name="' + i_name + '" ' + 
        'style="position:absolute;">' + 
		'<h1>' + i_title + '</h1>' + 
		//'<div id="attached"></div>' + 
	'</div>');
	
	// 親要素内のみドラッグ可能に設定する。
	$jqueryNoteItemContainer.draggable({
        containment: 'parent',
        scroll: false,		
	});

	///@summary JQuery Objectを出力する
	///@return  JQuery Object
	this.getJQueryObject = function () 
	{
		return $jqueryNoteItemContainer;
	}

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
})();

/// @summary 	付箋コンテナHTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
/// @return 	保存用XML
NoteItemContainer.HtmlToXml = function($i_jquery)
{
	var retVal = '';

	var tag = $i_jquery.attr('name');

    // ヘッダー情報（位置）を記入する。
	retVal += '<' + tag + ' ';
    retVal += 'left="' + $i_jquery.css('left') + '" ';
    retVal += 'top="' + $i_jquery.css('top') + '" ';
    retVal += '>';


	// 子要素のXMLを取得しにいく。
	$i_jquery.children('div.NoteItem').each(function () {
		retVal += NoteItem.HtmlToXml($(this));
	})

	retVal += '</' + tag + '>';

	return retVal;
}

//--------------------------------------------------//
///@summary カルテ項目コンテナ（所見（病名））
///@param $i_xml XML JQuery Object
function NoteItemContainerDisease ($i_xml)
{
	NoteItemContainer.call(this, this.getName(), '病名');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemDisease($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }

};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerDisease.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerDisease.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerDisease';
    };
})();

//--------------------------------------------------//

///@summary カルテ項目コンテナ（主訴）
///@param $i_xml XML JQuery Object
function NoteItemContainerComplaint ($i_xml)
{
	NoteItemContainer.call(this, this.getName(), '主訴');

	// 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
	if ($i_xml !== undefined)
	{
		if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
		{
            $i_xml.children().each(function(){
                var item = new NoteItemComplaint();
                item.setByXml($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
		}
	}
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerComplaint.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerComplaint.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerComplaint';
    };
})();

//--------------------------------------------------//

///@summary カルテ項目コンテナ（検査）
///@param $i_xml XML JQuery Object
function NoteItemContainerMedicalCheck ($i_xml)
{
	///@param クラス名
	NoteItemContainer.call(this, this.getName(), '検査');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemMedicalCheck($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMedicalCheck.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerMedicalCheck.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerMedicalCheck';
    };
})();

//--------------------------------------------------//

///@summary カルテ項目コンテナ（処方）
///@param $i_xml XML JQuery Object
function NoteItemContainerPrescription ($i_xml)
{
	NoteItemContainer.call(this, this.getName(), '処方');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemPrescription($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerPrescription.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerPrescription.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerPrescription';
    };
})();

//--------------------------------------------------//

///@summary カルテ項目コンテナ（手術）
///@param $i_xml XML JQuery Object
function NoteItemContainerOperation ($i_xml)
{
	NoteItemContainer.call(this, this.getName(), '手術');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemOperation($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerOperation.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerOperation.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerOperation';
    };
})();

//--------------------------------------------------//
///@summary カルテ項目コンテナ（メモ）
///@param $i_xml XML JQuery Object
function NoteItemContainerMemo ($i_xml)
{
	NoteItemContainer.call(this, 'NoteItemContainerMemo', 'メモ');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemMemo(); 
                item.setByXml($(this));
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerMemo.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerMemo.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerMemo';
    };
})();

//--------------------------------------------------//
///@summary カルテ項目コンテナ（シェーマ）
///@param $i_xml XML JQuery Object
function NoteItemContainerScheme ($i_xml)
{
	NoteItemContainer.call(this, 'NoteItemContainerScheme', 'シェーマ');

    // 既存のXMLデーターが存在する場合は、データーをDOMに追加する。
    if ($i_xml !== undefined)
    {
        if ($i_xml[0].tagName == $jqueryNoteItemContainer.attr('name').toUpperCase())
        {
            $i_xml.children().each(function(){
                var item = new NoteItemScheme($(this)); 
                $jqueryNoteItemContainer.append(item.getJQueryObject());
            });
        }
    }
};(function() {
    // 親クラス(Parent)のメソッドを継承
    var Super = function Super(){};
    Super.prototype = NoteItemContainer.prototype;
    NoteItemContainerScheme.prototype = new Super();
    var _super = Super.prototype;
    // プロトタイプ
    var _proto = NoteItemContainerScheme.prototype;
    // メンバメソッド(オーバーライド)
    _proto.getName = function() {
        // 親クラス(Parent)のgetName()を呼び出す
        //var name = _super.getName.call(this);
        return 'NoteItemContainerScheme';
    };
})();

//--------------------------------------------------//
