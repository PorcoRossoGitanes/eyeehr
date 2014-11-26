<!-- ログイン処理 -->
<?php
// セッションを開始する。
session_start();

// エラーメッセージを初期化する。
$message = "";

// 画面に表示するため特殊文字をエスケープする。
$userid = htmlspecialchars($_POST["userid"], ENT_QUOTES);

// ログインボタンが押された場合に、認証処理を実行する。      
if (isset($_POST["login"])) 
{
  include "AuthManager.php";

  $auth = new AuthManager();
  
  //echo("送信内容");echo($_POST["userid"]);echo($_POST["password"]);
  
  list($result, $message) = $auth->login($_POST["userid"], $_POST["password"]);
  
  //echo("送信結果");echo($result);echo($message);

  // 認証が成功した場合、電子カルテメイン画面に移動する。
  if ($result) 
  {
    header("Location: index.php"); 
    exit;
  }
}
?>
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>電子カルテ　ログイン</title>
    <script src="js/jquery-2.1.1.js"></script><!-- jQuery 2.1.1 -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
  </head>
  <body>
    <form id="formLogin" name="formLogin" action="<?php print($_SERVER['PHP_SELF']) ?>" method="POST">
    <fieldset>
      <legend>ログイン</legend>
      <div><?php echo $message ?></div>
      <label for="userid">ユーザID</label>
      <input type="text" id="userid" name="userid" value="<?php echo $userid ?>">
      <br>
      <label for="password">パスワード</label>
      <input type="password" id="password" name="password" value="">
      <br>
      <!--label></label-->
      <button type="submit" id="login" name="login">ログイン</button>
      </fieldset>
    </form>
  </body>
</html>