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
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <!--自作CSS-->    
  </head>
  <body>
    <h1>電子カルテ メニュー</h1>
    <div  class="container">
      <table class="table table-striped">
        <tbody>
          <tr>
            <!--th >受付</th-->
            <!--td>&nbsp;<a href="./login.php"><button type="button" id="login" class="btn btn-default btn-s page">ログイン</button></a></td-->
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">問診票<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./logout.php"><button type="button" id="logout" class="btn btn-danger btn-s page">ログアウト</button></a></td>
          </tr>
          <tr>
            <!--th>カルテ</th-->
            <td><a href="./main.php"><button type="button" id="main" class="btn btn-default btn-s page">カルテ<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
          </tr>
          <tr>
            <!--th>マスター</th-->
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">スタッフ情報</button></a></td>
            <td><a href="./none.php" target="_blank"><button type="button" id="none" class="btn btn-default btn-s page">患者情報</button></a></td>
            <td><a href="./importStampFromOrcaToXmlDb.php"><button type="button" id="importStampFromOrcaToXmlDb" class="btn btn-default btn-s page">スタンプ管理</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">付箋管理</button></a></td>
            <td><a href="./marker_list.php"><button type="button" id="none" class="btn btn-default btn-s page">マーカー管理</button></a></td>
          </tr>
          <tr>
            <!--th>文書</th-->
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">手紙※<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">紹介状<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">CL処方箋※CL販売管理SYSで作成？<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">眼鏡処方箋※CL販売管理SYSで作成？<!--作成--></button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">各種書類<!--作成--></button></a></td>
          </tr>
          <tr>
            <!--th>テスト</th-->
            <td><a href="./test.php"><button type="button" id="test" class="btn btn-info btn-s page">テスト</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
            <td><a href="./none.php"><button type="button" id="none" class="btn btn-default btn-s page">&nbsp;</button></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>