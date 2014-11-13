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
  <div id="utility" style="display:none"></div><!--ユーティリティで使用-->
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
        <td>付箋</td>
        <td>
          <!--スタンプリスト（アコーディオンメニュー）-->
          <div id="NoteItemMenu">
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemComplaint(); item.appendTo('[name=NoteItemContainerComplaint]');">主訴</h3>
            <div></div>
            <h3>病名</h3>
            <div>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemDisease(); item.setFormats('アレルギー性結膜炎'); item.appendTo('[name=NoteItemContainerDisease]');" title="アレルギー性結膜炎">ア結</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemDisease('角膜円錐'); item.setFormats('角膜円錐'); item.appendTo('[name=NoteItemContainerDisease]');">角膜円錐</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemDisease('白内障'); item.setFormats('白内障'); item.appendTo('[name=NoteItemContainerDisease]');">白内障</button>
            </div>
            <h3>検査</h3>
            <div>
              <button type="button" class="btn btn-default btn-xs" 
              onclick="var item = new NoteItemMedicalCheck(); item.setFormats('レフ・ケラト'); item.appendTo('[name=NoteItemContainerMedicalCheck]');"
              >レフ・ケラト</button>
            </div>
            <h3>処方</h3>
            <div>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('ベストロン点眼用0.5%'); item.appendTo('[name=NoteItemContainerPrescription]');">ベストロン点眼用0.5%</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('ヒアルロン酸目薬'); item.appendTo('[name=NoteItemContainerPrescription]');">ヒアルロン酸目薬</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('タリビッド眼軟膏0.3%');  item.appendTo('[name=NoteItemContainerPrescription]');">タリビッド眼軟膏0.3%</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('タリフロン点眼液0.3%');  item.appendTo('[name=NoteItemContainerPrescription]');">タリフロン点眼液0.3%</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('クラビット点眼液0.5%'); item.appendTo('[name=NoteItemContainerPrescription]');">クラビット点眼液0.5%</button>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemPrescription(); item.setFormats('バンコマイシン眼軟膏1%');  item.appendTo('[name=NoteItemContainerPrescription]');">バンコマイシン眼軟膏1%</button>
            </div>
            <h3>手術</h3>
            <div>
              <button type="button" class="btn btn-default btn-xs" onclick="var item = new NoteItemOperation(); item.setFormats('レーザー手術'); item.appendTo('[name=NoteItemContainerOperation]');">レーザー手術</button>
            </div>
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemScheme(); item.appendTo('[name=NoteItemContainerScheme]')">シェーマ</h3>
            <div></div>
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemMemo(); item.appendTo('[name=NoteItemContainerMemo]')">メモ</h3>
            <div></div>
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