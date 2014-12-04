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
    <!--自作CSS-->    
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <!--自作CSS-->    
  </head>
  <body style="position:absolute">
  <div>
  　<!--デバック用-->
    <input class="form-control" id="CurrentFilePath" style="display:inline-block; display:inline;" /><!--保存中のファイル名（デバッグ用）-->
    <!--button type="button" id="new" class="btn btn-default btn-s"><span class="glyphicon glyphicon-plus">新規作成</span></button-->
    <button type="button" id="load" class="btn btn-default btn-s"><span class="glyphicon glyphicon-open">読込</span></button>
    <button type="button" id="save" class="btn btn-default btn-s"><span class="glyphicon glyphicon-save">保存</span></button>
    <button type="button" id="logout" class="btn btn-default btn-s" onclick="location.href='logout.php'"> <span class="glyphicon glyphicon-plus">ログアウト</span></button>
  </div>
  <div name="Note" style="position:absolute;zIndex:9999:" valign="top" style="border: 1px solid #000000"></div>
  <div id="MenuLeft" style="position:relative;zIndex:1;width:280px">
    <table>
      <tr>
        <td valign="top">
          <!--医師情報--><div><label>主治医</label>&nbsp; 00001 渡邉花子</div>      
          <label>患者情報</label><!--患者情報-->
          <input type="text" class="form-control mini" id="PatientId" value=""/>
          <button type="button" id="patient-info" class="btn btn-default btn-xs">読込</button>
          <div>山田太郎</div>
          <button type="button" id="patient-info" class="btn btn-default btn-xs">詳細</button>
        </td>
      </tr>
      <tr>
        <td valign="top">
          <!--iframe style="width:100%;height:100%"><html-->
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
          <!--/html></iframe-->
        </td>    
      </tr>
    </table>
  </div>
  <div id="MenuRight" style="position:relative;width:280px">
    <table>
      <tr>
        <td>
          <!--付箋特記事項編集欄-->
          <input id="selectedNoteItem" type="hidden" value="" style="width:100%;"/> 
        </td>
      </tr>
      <tr>
        <td>
          <!--スタンプリスト（アコーディオンメニュー）-->
          <div id="NoteItemMenu">
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemComplaint(); item.appendTo('[name=NoteItemContainerComplaint]');">主訴</h3><div></div>
            <h3>病名</h3><div class="stamp_list" id="disease"></div>
            <h3>検査</h3><div class="stamp_list" id="medical_check"></div>
            <h3>処置</h3><div class="stamp_list" id="treatment"></div>
            <h3>手術</h3><div class="stamp_list" id="operation"></div>
            <h3>医薬品</h3>
            <div class="stamp_list" id="medical_product">
              <div class="radio">
                <label><input type="radio" name="stamp_list_medical_product" value="検査"> 検査</label>
                <label><input type="radio" name="stamp_list_medical_product" value="処方" checked> 処方</label>
                <label><input type="radio" name="stamp_list_medical_product" value="処置"> 処置</label>
                <label><input type="radio" name="stamp_list_medical_product" value="処置"> 手術</label>
              </div>           
            </div>
            <h3>注射</h3>
            <div class="stamp_list" id="injection">
              <div class="radio">
                <label><input type="radio" name="stamp_list_injection_select" value="検査"> 検査</label>
                <label><input type="radio" name="stamp_list_injection_select" value="処方"> 処方</label>
                <label><input type="radio" name="stamp_list_injection_select" value="処置" checked> 処置</label>
                <label><input type="radio" name="stamp_list_injection_select" value="処置"> 手術</label>
              </div>    
            </div>
            <h3>特定機材</h3>
            <div class="stamp_list" id="machine">
              <div class="radio">
                <label><input type="radio" name="stamp_list_machine_select" value="検査"> 検査</label>
                <label><input type="radio" name="stamp_list_machine_select" value="処方"> 処方</label>
                <label><input type="radio" name="stamp_list_machine_select" value="処置" checked> 処置</label>
                <label><input type="radio" name="stamp_list_machine_select" value="処置"> 手術</label>
              </div>    
            </div>
            <!--h3 class='ui-state-disabled' onclick="var item = new NoteItemScheme(); item.appendTo('[name=NoteItemContainerScheme]')">シェーマ</h3><div></div-->
            <h3 class='ui-state-disabled' onclick="var item = new NoteItemMemo(); item.appendTo('[name=NoteItemContainerMemo]')">メモ</h3><div></div>
          </div>
        </td>
      </tr>
    </table>  
  </div>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  <script src="js/jquery.base64/jquery.base64.js"></script>
  
  <script src="js/Utility/Utility.js"></script>
  
  <script src="js/Config/Config.js"></script>

  <script src="js/Staff/Staff.js"></script>
  
  <script src="js/Patient/Patient.js"></script>

  <script src="js/Stamp/Stamp.js"></script>
  <script src="js/Stamp/StampDisease.js"></script>
  <script src="js/Stamp/StampInjection.js"></script>
  <script src="js/Stamp/StampMachine.js"></script>
  <script src="js/Stamp/StampMedicalCheck.js"></script>
  <script src="js/Stamp/StampMedicalProduct.js"></script>
  <script src="js/Stamp/StampOperation.js"></script>
  <script src="js/Stamp/StampTreatment.js"></script>

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