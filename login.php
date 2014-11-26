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
    <!--自作CSS-->    
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <!--自作CSS-->    
  </head>
  <body class="form">
    <form id="formLogin" class="form-horizontal" name="formLogin" action="<?php print($_SERVER['PHP_SELF']) ?>" method="POST">
      <fieldset>
        <legend>ログイン</legend>
        <div><?php echo $message ?></div>
        <div class="form-group">
          <label for="userid" class="col-sm-2 control-label">ユーザID</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" id="userid" name="userid" value="<?php echo $userid ?>">
          </div>
        </div>
        <br>
        <div class="form-group">
          <label for="password" class="col-sm-2 control-label">パスワード</label>
          <div class="col-sm-10">
            <input class="form-control" type="password" id="password" name="password" value="">
          </div>
        </div>
        <br>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10"><button class="btn btn-default" type="submit" id="login" name="login">ログイン</button>
            </div>
          </div>
      </fieldset>
      </form>
  </body>
</html>