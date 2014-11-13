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
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>電子カルテ</title>
    <script src="js/jquery-2.1.1.js"></script><!-- jQuery 2.1.1 -->
    <script src="js/jquery-ui/jquery-ui.js"></script><!-- jQuery-ui 1.11.1 -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
    <!--自作CSS-->    
    <!--link href="css/style.css" rel="stylesheet" type="text/css"-->
    <style>
/*タイトル*/
h1
{
  text-align: center; 
}
/*ページ遷移ボタン*/
button.page 
{
  /**/
  display : inline-block;
  width : 200px;
}
    </style>
    <!--自作CSS-->    
  </head>
  <body>
    <h1>電子カルテ メニュー</h1>
    <div  class="container">
      <table class="table table-striped">
        <tbody>
          <tr>
            <!--td>&nbsp;<a href="./login.php"><button type="button" id="login" class="btn btn-default btn-s page">ログイン</button></a></td-->
            <td><a href="./main.php"><button type="button" id="main" class="btn btn-default btn-s page">メイン画面</button></a></td>
            <td><a href="./importStampFromOrcaToXmlDb.php"><button type="button" id="importStampFromOrcaToXmlDb" class="btn btn-default btn-s page">ORCA点数マスター自動取込</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./logout.php"><button type="button" id="logout" class="btn btn-danger btn-s page">ログアウト</button></a></td>
          </tr>
          <tr>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
          </tr>
          <tr>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
          </tr>
          <tr>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
            <td><a href="./none.php"><button type="button" id="logout" class="btn btn-default btn-s page">（未割当）</button></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>