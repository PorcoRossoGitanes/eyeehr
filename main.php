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
    <script src="js/contextmenu/jquery.contextmenu.r2.packed.js"></script><!-- ContextMenu Plugin dependent on jQuery  -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
    <script src="js/plugin/sidr/jquery.sidr.min.js"></script><!-- スライドメニュー -->
    <link rel="stylesheet" href="js/plugin/sidr/stylesheets/jquery.sidr.dark.css"><!-- スライドメニュー -->
    <link href="css/style.css" rel="stylesheet" type="text/css"><!--自作CSS-->    
  </head>
  <body style="position:absolute">

    <!-- 左サイドメニュー -->
    <a id="SideMenuLeft" href="#sidr">メニュー表示</a>
    <div id="sidr">
      <ul>
        <!-- デバッグ用ファイルパス -->
        <li><a href="#"><input class="form-control" id="CurrentFilePath" style="display:inline-block; display:inline;"/></a></li>
        <!--li><a href="#">新規作成</a></li-->
        <li id="LoadNote">開く</li>
        <li id="SaveNote">保存</li>
        <li id="ReallocateNote">再配置</li>
        <li id="DebutNoteHTML">[開発]カルテHTML</li>
        <li><a href="logout.php">ログアウト</a></li>
      </ul>
    </div>

    <!-- カルテ -->
    <div name="Note" style="position:absolute;zIndex:9999:" valign="top" style="border: 1px solid #000000"></div>
    <!-- 左メインメニュー -->
    <div id="MenuLeft" style="position:relative;zIndex:1;width:280px">
    <table>
      <tr>
        <td valign="top">
          <!--医師情報--><div><label>主治医</label>&nbsp; 00001 渡邉花子</div>      
          <form class="form-inline" role="form">
            <div class="form-group">
              <label class="sr-only" for="PatientId">患者番号</label>
              <input type="number" class="form-control" id="PatientId" placeholder="患者番号">
            </div>
            <button type="button" class="btn btn-default" id="LoadPatientId">読込</button>
          </form>
          <form class="form-inline" role="form">
            <div class="form-group">
              <label class="sr-only" for="PatientName">患者氏名</label>
              <input type="text" class="form-control" id="PatientName" placeholder="患者氏名">
            </div>
            <button type="button" class="btn btn-default" id="LoadPatientInfo">詳細</button>
          </form>
        </td>
      </tr>
      <tr>
        <td valign="top">
          <div style='clear:both;' id="MenuLeftTab">
            <ul>
              <li><a href="#MenuLeftTabIndexList">付箋</a></li>
              <li><a href="#MenuLeftTabDisease">病歴</a></li>
              <li><a href="#MenuLeftTabHistory">履歴</a></li>
            </ul>
            <div id="MenuLeftTabIndexList" style="padding:0">
              <div id="IndexList" style="width:100%;height:700px;overflow-y:scroll;margin:0;padding:8">
                <div class="Index IndexDate">2014/02/06</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">視力検査</div>
                <div class="Index IndexItem">処方（AAA,XXX）</div>
                <div class="Index IndexDate">2014/01/06</div>
                <div class="Index IndexItem">プラン</div>
                <div class="Index IndexDate">2013/12/08</div>
                <div class="Index IndexItem">Dr.メモ</div>
                <div class="Index IndexDate">2013/11/06</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2013/10/01</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2013/09/01</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2013/08/15</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2013/07/02</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2013/01/06</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexDate">2012/12/06</div>
                <div class="Index IndexItem">アムスラー</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
                <div class="Index IndexItem">○○検査</div>
              </div>   
            </div>
            <div id="MenuLeftTabDisease" style="padding:0">
              <!--iframe style="width:100%;height:100%"><html-->
              <div id="Disease" style="width:100%;height:700px;overflow-y:scroll;margin:0;padding:8">
                <div class="Index IndexDate">2014/02/06</div>
                <div class="Index IndexItem">糖尿病</div>
                <div class="Index IndexDate">2014/01/06</div>
                <div class="Index IndexItem">花粉症</div>
              </div>   
            </div>         
            <div id="MenuLeftTabHistory" style="padding:0">
              <div id="History" style="width:100%;height:700px;overflow-y:scroll;margin:0;padding:8">
              </div>            
            </div>
          </div>
        </td>    
      </tr>
    </table>
  </div>


  <!-- 右メインメニュー -->
  <div id="MenuRight" style="position:relative;width:280px;">
    <div style='clear:both;' id="MenuRightTab">
      <ul>
        <li><a href="#MenuLeftTabStampGadget">スタンプ</a></li>
        <li><a href="#MenuLeftTabElse">その他</a></li>
      </ul>
      <div id="MenuLeftTabStampGadget" style="padding:0"><div id="StampGadget"></div><!--スタンプリスト（アコーディオンメニュー）--></div>
      <div id="MenuLeftTabElse" style="padding:0">
        <div id="IndexGadget">付箋</div>
        <div id="MarkGadget">ぶたさんマーク</div>
      </div>
    </div>
  </div>

<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  <script src="js/jquery.base64/jquery.base64.js"></script>
  
  <script src="js/String.js"></script>
  <script src="js/Utility/Utility.js"></script>
  
  <script src="js/Config/Config.js"></script>

  <script src="js/Staff/Staff.js"></script>
  
  <script src="js/Patient/Patient.js"></script>

  <script src="js/Stamp/Stamp.js"></script>
  <script src="js/Stamp/StampComplaint.js"></script>
  <script src="js/Stamp/StampDisease.js"></script>
  <script src="js/Stamp/StampInjection.js"></script>
  <script src="js/Stamp/StampMachine.js"></script>
  <script src="js/Stamp/StampMedicalCheck.js"></script>
  <script src="js/Stamp/StampMedicalProduct.js"></script>
  <script src="js/Stamp/StampOperation.js"></script>
  <script src="js/Stamp/StampTreatment.js"></script>
  <script src="js/Stamp/StampMemo.js"></script>

  <script src="js/StampList/StampList.js"></script>
  <script src="js/StampList/StampListComplaint.js"></script>
  <script src="js/StampList/StampListDisease.js"></script>
  <script src="js/StampList/StampListMedicalCheck.js"></script>
  <script src="js/StampList/StampListTreatment.js"></script>
  <script src="js/StampList/StampListMedicalProduct.js"></script>  
  <script src="js/StampList/StampListOperation.js"></script>
  <script src="js/StampList/StampListInjection.js"></script>
  <script src="js/StampList/StampListMachine.js"></script>
  <script src="js/StampList/StampListMemo.js"></script>

  <script src="js/StampGadget/StampGadget.js"></script>

  <script src="js/NoteItem/NoteItem.js"></script>
  <script src="js/NoteItem/NoteItemComplaint.js"></script>
  <script src="js/NoteItem/NoteItemDisease.js"></script>
  <script src="js/NoteItem/NoteItemMedicalCheck.js"></script>
  <script src="js/NoteItem/NoteItemPrescription.js"></script>
  <script src="js/NoteItem/NoteItemTreatment.js"></script>
  <script src="js/NoteItem/NoteItemOperation.js"></script>
  <script src="js/NoteItem/NoteItemScheme.js"></script>
  <script src="js/NoteItem/NoteItemMemo.js"></script>

  <script src="js/NoteItemContainer/NoteItemContainer.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerComplaint.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerDisease.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerMedicalCheck.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerTreatment.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerPrescription.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerOperation.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerScheme.js"></script>
  <script src="js/NoteItemContainer/NoteItemContainerMemo.js"></script>

  <script src="js/Note/Note.js"></script>

  <!--script src="js/XmlManager.js"/></script-->
  <script src="js/Main.js"></script>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  </body>
</html>