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
<!--div>
	<form action="cgi-bin/registStamp.cgi" method="post" enctype="multipart/form-data">
		<input type="file" name="csv"/>
		<select>
			<option value="1">1.診療行為</option>
			<option value="2">2.医薬品</option>
			<option value="3">3.特定機材</option>
			<option value="6">6.コメントファイル</option>
			<option value="7">7.自費</option>
		</select>
		<input type="submit" value="送信" />
		<input type="reset" value="リセット" />
	</form>
	<textarea cols="40" rows="30"></textarea>
</div-->

<html>
<head>
<title>画像アップロード</title>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-JP">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<!--form name="form1" method="post" action="./cgi-bin/test3.cgi" enctype="multipart/form-data"-->
<form name="form1" method="post" action="./cgi-bin/loadStamp.cgi" enctype="multipart/form-data">
<input type="file" name="filename" size="60">
<BR>
<input type="submit" name="submit" value="送信">
</form>
</body>
</html>