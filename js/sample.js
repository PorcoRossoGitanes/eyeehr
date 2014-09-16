//@param 入力パネルインスタンス
var area = null;

//@param 現在の付箋

// @summary nicEditの呼び込み時、入力欄を追加する。
bkLib.onDomLoaded(function() {
  area = new nicEditor({buttonList:[
  	'bold','italic','underline'/*,'image','upload'*/
  ]}).panelInstance('area1');
});

$(function() 
{
	/// @summary 「読込」ボタンを押下時、XMLを読込む。
	$('button#load').click(function(){
		XmlManager.LoadNote($('div#currentFilePath').text());
	});

	/// @summary 「保存」ボタンを押下時、XMLを保存する。
	$('button#save').click(function(){
		// 本日のカルテをXMLに変更する。
		var xml = '';
		$('td[name="note"]').each(function(){
			xml = Utility.HtmlInputItemToXml($(this));
		})
	    //console.log('Utility.HtmlInputItemToXml : ' + xml);

	    var now = new Date();
		
		//console.log(now);
		
		var yyyy = now.getFullYear().toString();
   		var MM = (now.getMonth()+1).toString(); // getMonth() is zero-based
   		var dd = now.getDate().toString();
   		var hh = now.getHours().toString();
   		var mm = now.getMinutes().toString();
        var ss = now.getSeconds().toString();

   		var yyyyMMddhhmmss = 
   			yyyy + 
   			(MM[1]?MM:"0"+MM[0]) + 
   			(dd[1]?dd:"0"+dd[0]) + 
   			(hh[1]?hh:"0"+hh[0]) + 
   			(mm[1]?mm:"0"+mm[0]) + 
   			(ss[1]?ss:"0"+ss[0]);
   		//console.log(yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0])); // padding

		$('div#currentFilePath').text('/db/sample/test' + yyyyMMddhhmmss + '.xml');
		XmlManager.SaveNote($('div#currentFilePath').text(), xml);
		//alert('save');
	});

	// @summary 「患者情報」ボタンを押下時、患者情報を表示する。
	$('button#patient-info').click(function(){
		alert('患者情報表示');
	});

	// @summary 「付箋保存」ボタンを押下時、付箋のテキストを更新する。
	$('button#fix').click(function () 
	{
		// 変更内容を取得する。
		var memo = area.instanceById('area1').getContent();
		
		// 付箋IDを取得する。
		var id = $('input#selectedNoteItem').val();

		// IDが存在すれば、付箋を更新する。
		if (id != '')
		{
			var rootSelector = 'div#' + id;
			NoteItem.ChangeVal($(rootSelector), memo);
		}
	});

	//■コンテナを生成する。
	$currentNote = $('[name=note]');
	var containerComplaint = new NoteItemContainerComplaint();
	$currentNote.append(containerComplaint.getJQueryObject());
	var containerDisease = new NoteItemContainerDisease();
	$currentNote.append(containerDisease.getJQueryObject());
	var containerMedicalCheck = new NoteItemContainerMedicalCheck();
	$currentNote.append(containerMedicalCheck.getJQueryObject());
	var containerPrescription = new NoteItemContainerPrescription();
	$currentNote.append(containerPrescription.getJQueryObject());
	var containerOperation = new NoteItemContainerOperation();
	$currentNote.append(containerOperation.getJQueryObject());
	var containerMemo = new NoteItemContainerMemo();
	$currentNote.append(containerMemo.getJQueryObject());
	var containerScheme = new NoteItemContainerScheme();
	$currentNote.append(containerScheme.getJQueryObject());


	// ■初回起動時、主訴欄を生成する。
	//new NoteItemComplaint('本日の主訴を入力してください。');

});

///@summary コンストラクタ
function Utility() {
}

/// @summary 	HTMLをXMLに保存する。
/// @param 		$i_jquery HTML（入力フォーム）を含む例:input,textarea,select ...等
Utility.HtmlInputItemToXml = function($i_jquery)
{
	var retVal = '';

	// 入力タグとなりうる要素を取得する。
	const childElementTags = new Array('DIV', 'INPUT', 'TEXTAREA', 'SELECT');


	// name属性をタグとして使用する。
	var tag = $i_jquery.attr('name');

	// XMLを生成する。
	if(tag !== undefined)
	{
		retVal += '<' + tag + '>';
	
		// 子供を持っている場合は再起的にXMLを生成する。
		// テーブルなどで形式を制御する場合もあるので、findを使用する。
		var inputChildrenCnt = $i_jquery.find(childElementTags.toString()).length
		var containInputChildren =  inputChildrenCnt > 0;

		// 内部文字列を取得する
		switch ($i_jquery[0].tagName)
		{
			case 'DIV' :  // DIVタグの場合
				if(containInputChildren == false) retVal += $i_jquery.html();
				break;
			case 'INPUT' : // INPUTタグの場合
				retVal += $i_jquery.attr('value');
				break;
			// TODO : TEXTAREA
			// TODO : SELECTボックスなど
			default : 
				//console.log($i_jquery[0].tagName);
				// それ以外の場合は出力しない。
				break;		
		}

		// 子供の要素を再起的に呼び出す。
		$i_jquery.children().each(function () {
			retVal += Utility.HtmlInputItemToXml($(this));
		})

		retVal += '</' + tag + '>';		
	}

	return retVal;
}

