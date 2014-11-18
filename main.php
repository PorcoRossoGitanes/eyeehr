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
    <!--meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1"-->

    <script src="js/jquery-2.1.1.js"></script><!-- jQuery 2.1.1 -->
    <script src="js/jquery-ui/jquery-ui.js"></script><!-- jQuery-ui 1.11.1 -->
    <link href="js/jquery-ui/jquery-ui.css" rel="stylesheet"><!-- jQuery-ui 1.11.1 -->
    <!--link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" /-->
    <script src="js/contextmenu/jquery.contextmenu.r2.packed.js"></script><!-- ContextMenu Plugin dependent on jQuery  -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
    <!--script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script--><!--nicEdit-->
    
    <script src="js/nicEdit/nicEdit.js" type="text/javascript"></script><!--nicEdit-->

    <!--自作CSS-->    
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <!--自作CSS-->    
  </head>
  <body>
  <div>
    <input id="currentFilePath" style="display: inline-block; _display: inline;"/><!--保存中のファイル名（デバッグ用）-->
    <button type="button" id="new" class="btn btn-default btn-s"><span class="glyphicon glyphicon-plus">新規作成</span></button>
    <button type="button" id="load" class="btn btn-default btn-s"><span class="glyphicon glyphicon-open">読込</span></button>
    <button type="button" id="save" class="btn btn-default btn-s"><span class="glyphicon glyphicon-save">保存</span></button>
  
    <!--2014/08/31 12:34--><!--現在時刻不要？-->
    <label>医師</label>&nbsp; 00001 渡邉花子

    <!-- ログアウト -->
    <button type="button" id="logout" class="btn btn-default btn-s" onclick="location.href='logout.php'">
      <span class="glyphicon glyphicon-plus">ログアウト</span>
    </button>
    <!-- ログアウト -->
  </div>
  <table border="1">
    <tr>
      <td valign="top">
      <!--患者情報-->
      <!--label>患者</label>&nbsp; --><input type="text" class="input-small" value="10002"/> 山田太郎 &nbsp;
      <button type="button" id="patient-info" class="btn btn-default btn-xs">患者情報</button>
      </td>

      <!--name="note" カルテ記入欄-->
      <td name="Note" style="width:1000px;height:700px;" rowspan="2" valign="top"></td>
      
      <td style="width:280px">
        <!--付箋特記事項編集欄-->
        <textarea id="area1" data-from="" style="width: 100%;"></textarea>
        <input id="selectedNoteItem" type="hidden" value=""/> 
      </td>
      <tr>
        <td valign="top">
          <div id="IndexList">
            <div >2014/02/06</div>
            <div >○○検査</div>
            <div >視力検査</div>
            <div >処方（AAA,XXX）</div>
            <div >2014/01/06</div>
            <div >○○検査</div>
          </div>
        </td>
        <td>
          <!--スタンプリスト（アコーディオンメニュー）-->
          <div id="NoteItemMenu">
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemComplaint(); item.appendTo('[name=NoteItemContainerComplaint]');">主訴</h3><div></div>
            <h3>病名</h3><div class="stamp_list" id="disease"></div>
            <h3>検査</h3><div class="stamp_list" id="medical_check"></div>
            <h3>注射</h3><div class="stamp_list" id="injection"></div>
            <h3>特定機材</h3><div class="stamp_list" id="machine"></div>
            <h3>処置</h3><div class="stamp_list" id="treatment"></div>
            <h3>手術</h3><div class="stamp_list" id="operation"></div>
            <h3>処方（医薬品）</h3><div class="stamp_list" id="medical_product"></div>
            <!--h3 class='ui-state-disabled' onclick="var item = new NoteItemScheme(); item.appendTo('[name=NoteItemContainerScheme]')">シェーマ</h3><div></div-->
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemMemo(); item.appendTo('[name=NoteItemContainerMemo]')">メモ</h3><div></div>
          </div>
        </td>
      </tr>
    </tr>
  </table>  
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  <script src="js/jquery.base64/jquery.base64.js"></script>
  
  <script src="js/Utility.js"></script>

  <script src="js/Staff.js"></script>
  
  <script src="js/Patient.js"></script>

  <script src="js/Stamp.js"></script>
  <script src="js/StampDisease.js"></script>
  <script src="js/StampInjection.js"></script>
  <script src="js/StampMachine.js"></script>
  <script src="js/StampMedicalCheck.js"></script>
  <script src="js/StampMedicalProduct.js"></script>
  <script src="js/StampOperation.js"></script>
  <script src="js/StampTreatment.js"></script>

  <script src="js/NoteItem.js"></script>
  <script src="js/NoteItemComplaint.js"></script>
  <script src="js/NoteItemDisease.js"></script>
  <script src="js/NoteItemMedicalCheck.js"></script>
  <script src="js/NoteItemPrescription.js"></script>
  <script src="js/NoteItemOperation.js"></script>
  <script src="js/NoteItemScheme.js"></script>
  <script src="js/NoteItemMemo.js"></script>

  <script src="js/NoteItemContainer.js"></script>
  <script src="js/NoteItemContainerComplaint.js"></script>
  <script src="js/NoteItemContainerDisease.js"></script>
  <script src="js/NoteItemContainerMedicalCheck.js"></script>
  <script src="js/NoteItemContainerPrescription.js"></script>
  <script src="js/NoteItemContainerOperation.js"></script>
  <script src="js/NoteItemContainerScheme.js"></script>
  <script src="js/NoteItemContainerMemo.js"></script>

  <script src="js/Note.js"></script>

  <!--script src="js/XmlManager.js"/></script-->
  <script src="js/Main.js"></script>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->

  </body>
</html>