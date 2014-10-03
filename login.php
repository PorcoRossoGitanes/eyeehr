<?php
  // セッションを開始する。
  session_start();
  
  // XMLデーターを初期化する。
  $xmlData = "";
  // エラーメッセージを初期化する。
  $errorMessage = "";
  // 画面に表示するため特殊文字をエスケープする。
  $viewUserId = htmlspecialchars($_POST["userid"], ENT_QUOTES);

  // ログインボタンが押された場合に、実行する。      
  if (isset($_POST["login"])) 
  {

    // XMLファイルを指定する。
    // 例）$uri = "sample.xml";//"http://192.168.33.10:8080/exist/rest/apps/eyeehr/data/staff/staff-1.xml";
    $uri = "http://" .$_SERVER["SERVER_NAME"] /*. ":8080"*/   // ドメイン・ポート
    . "/exist/rest/apps/eyeehr/" // プロジェクトルート
    . "data/staff/"             // データパス
    . "staff-" . $_POST["userid"] . ".xml";//ファイルを指定

    $xmlData = simplexml_load_file($uri);//xmlを読み込む

    if ($_POST["userid"] == $xmlData['id'] && $_POST["password"] == $xmlData->pswd) 
    {
      // 認証成功時、セッションIDを新規に発行する。
      session_regenerate_id(TRUE);
      $_SESSION["USERID"] = $_POST["userid"];

      // 電子カルテメイン画面に移動する。
      header("Location: main.php");
      exit;
    }
    else {
      $errorMessage = "ユーザID、または、パスワードに誤りがあります。";
    }
  }
?>
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>電子カルテ　ログイン</title>
  </head>
  <body>
    <form id="formLogin" name="formLogin" action="<?php print($_SERVER['PHP_SELF']) ?>" method="POST">
    <fieldset>
      <legend>ログイン</legend>
      <div><?php echo $errorMessage ?></div>
      <label for="userid">ユーザID</label>
      <input type="text" id="userid" name="userid" value="<?php echo $viewUserId ?>">
      <br>
      <label for="password">パスワード</label>
      <input type="password" id="password" name="password" value="">
      <br>
      <!--label></label-->
      <input type="submit" id="login" name="login" value="ログイン">
      </fieldset>
    </form>
  </body>
</html>