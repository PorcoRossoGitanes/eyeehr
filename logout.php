<?php

// セッションを開始する。
session_start();


if (isset($_SESSION["USERID"])) 
{
  $message = "ログアウトしました。";
}
else 
{
  $message = "セッションがタイムアウトしました。";
}
// セッション変数をクリアする。
$_SESSION = array();

// クッキーを破棄する。
if (ini_get("session.use_cookies")) 
{
    $params = session_get_cookie_params();
    setcookie(
        session_name(), 
        '', 
        time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
// セッションをクリアする。
@session_destroy();
?>

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>電子カルテ　ログアウト</title>
  </head>
  <body>
  <div><?php echo $message; ?></div>
  <ul>
  <li><a href="login.php">ログイン画面に戻る</a></li>
  </ul>
  </body>
</html>