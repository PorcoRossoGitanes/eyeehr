<!-- @summary ORCAから出力したCSVをスタンプとしてXMLDBに読込む。 -->
<!-- 初期設定 -->
<?php 
?>
<!--ログイン管理-->
<?php
// セッションを開始する。
session_start();

// セッションでログイン状態のチェックする。
// $_SESSION["USERID"]が存在しない場合には、ログアウトする。
if (!isset($_SESSION["USERID"])) {
  header("Location: logout.php");
  exit;
}
?>

<html>
	<head>
		<title>マスター取込機能</title>
	    <script src="js/jquery-2.1.1.js"></script><!-- jQuery 2.1.1 -->
		<meta http-equiv="Content-Type" content="text/html; charset=EUC-JP">
	    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
	    <!--自作CSS-->    
	    <link href="css/style.css" rel="stylesheet" type="text/css">
	    <!--自作CSS-->    
	</head>
	<body>
		<h1>マスター取込機能</h1>
		<h2>スタンプ</h2>
			<p>ORCAの点数マスター（CSV）等からスタンプを自動登録する事が出来ます。</p>
			<ol>
				<li>「ファイルを選択」からCSVファイルを指定してください。</li>
				<li>「送信」ボタンを押してください。</li>
			</ol>
			<form 
				name="ImportStampFromOrcaToXmlDb"
				method="POST" 
				action="./cgi-bin/ImportStampFromOrcaToXmlDb.cgi" 
				enctype="multipart/form-data" 
				target="result"
			>
		    <div class="container">
		      	<table class="table table-striped">
		      		<thead>
		      			<tr>
		      			</tr>
		      		</thead>
		      		<tfoot class="submit">
						<tr><td colspan="3"><input type="submit" name="submit" value="送信"></td></tr>	      			
		      		</tfoot>
		      		<tbody>
						<tr>
							<th>病名（所見）</th>
							<td><input type="file" name="DISEASE" data-default="DISEASE.csv"></td>
							<td>書式</td>
						</tr>
						<tr>
							<th>OUTPUT001.csv（ORCA 点数マスター 診療行為）</th>
							<td><input type="file" name="OUTPUT001" data-default="OUTPUT001.csv"></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<th>OUTPUT002.csv（ORCA 点数マスター 医薬品）</th>
							<td><input type="file" name="OUTPUT002" data-default="OUTPUT002.csv"></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<th>OUTPUT003.csv（ORCA 点数マスター 特定機材）</th>
							<td><input type="file" name="OUTPUT003" data-default="OUTPUT003.csv"></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<th>OUTPUT006.csv（ORCA 点数マスター コメントファイル）</th>
							<td><input type="file" name="OUTPUT006" data-default="OUTPUT006.csv"></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<th>OUTPUT007.csv（ORCA 点数マスター 自費）</th>
							<td><input type="file" name="OUTPUT007" data-filename="OUTPUT001.csv"></td>
							<td>&nbsp;</td>
						</tr>
					<tbody>
				</table>
			</div>
		</form>
		<script>
//---
$('input[type="file"]').change(function (){
	// 選択されたファイル名を取得する。
	$filepath = $(this).val(); $cur_filename = $filepath.substring($filepath.lastIndexOf('\\') + 1, $filepath.length);  
	// デフォルトのファイル名（ORCAから出力されるファイル名）を設定する。
	$def_filename = $(this).data('default');

	// 選択されたファイル名がデフォルトのファイル名が異なる場合、警告ダイアログを表示する。
	if ($cur_filename != $def_filename) 
	{
		// メッセージを生成する。
		var message = '選択された「' + $cur_filename + '」は、\n' +'ORCA標準のファイル名「' + $def_filename + '」と\n' + '異なりますが、設定しますか。\n' + 'よろしいですか?';
		// キャンセル時はリセットする。
		if (!confirm(message)) $(this).val("");
	}
});
//---
		</script>

<!--結果表示-->
		<div>
			<input name="result_disp" type="radio" value="off" checked/> 概要表示  
			<input name="result_disp" type="radio" value="on" /> 詳細表示
		</div>
		<iframe name="result" width="100%"></iframe>
		<script>
//---
/// @sumamry ラジオボタンが変更されたとき、結果表示を切り替える。
$('input[name="result_disp"]:radio').change( function() {  
	switchResultDisp($(this).val());
}); 
/// @sumamry 結果が表示されたとき、結果表示を切り替える。
$('iframe[name="result"]').load(function (){
	var flag = $("input[name='result_disp']:checked").val();
	switchResultDisp(flag);
});

///@summary 表示タイプを切り替える
///@param i_flag フラグ(on:詳細表示, off:概要表示)
function switchResultDisp (i_flag) 
{
	// 結果表示用のiframeを取得する。
	$iframe_result = $('iframe[name="result"]')
	// 詳細表示を取得する。
	$lines = $iframe_result.contents().find('div.line');
	

	if (i_flag == "on") $lines.css("display", "inherit");
	else $lines.css("display", "none");
}
//---
		</script>
	</body>
</html>