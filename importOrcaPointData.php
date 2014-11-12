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
		<title>ORCAデーター取込</title>
		<meta http-equiv="Content-Type" content="text/html; charset=EUC-JP">
		<!--style>
.line {font-size: 9pt;}
.result {font-size: 9pt;}
		</style-->
	</head>
	<body>

		<p>ORCAの点数マスター（CSV）からスタンプを自動登録する事が出来ます。</p>
		<ol>
			<li>「ファイルを選択」から点数マスター（CSV）を指定してください。</li>
			<li>「送信」ボタンを押してください。</li>
		</ol>
		<form 
			name="importOrca" 
			method="post" 
			action="./cgi-bin/loadStamp.cgi" 
			enctype="multipart/form-data" 
			target="result"
		>
			<table border=1>
				<tr>
					<th>OUTPUT001.csv（診療行為）</th>
					<td><input type="file" name="filename[001]"></td>
				</tr>
				<tr>
					<th>OUTPUT002.csv（医薬品）</th>
					<td><input type="file" name="filename[002]"></td>
				</tr>
				<tr>
					<th>OUTPUT003.csv（特定機材）</th>
					<td><input type="file" name="filename[003]"></td>
				</tr>
				<tr>
					<th>OUTPUT006.csv（コメントファイル）</th>
					<td><input type="file" name="filename[006]"></td>
				</tr>
				<tr>
					<th>OUTPUT007.csv（自費）</th>
					<td><input type="file" name="filename[007]"></td>
				</tr>
				<tr>
					<td colspan="2"><input type="submit" name="submit" value="送信"></td>
				</tr>
			</table>
		</form>
		<iframe name="result" width="100%"></iframe>
	</body>
</html>