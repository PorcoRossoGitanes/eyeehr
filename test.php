<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>電子カルテ</title>
    <script src="js/jquery-2.1.1.js"></script><!-- jQuery 2.1.1 -->
    <script src="js/jquery-ui/jquery-ui.js"></script><!-- jQuery-ui 1.11.1 -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap -->
    <link href="css/style.css" rel="stylesheet" type="text/css"><!--自作CSS-->    
  </head>
  <body>
    <h1>電子カルテ テスト</h1>
    <div  class="container">
      <table class="table table-striped">
        <thead><tr><td colspan="5">JQuery関連</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="UtilityInnerHtml" class="btn btn-default btn-s page">JS Object-&gt;HTML</button></td>

            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
        </tbody>
        <thead><tr><td colspan="5">XML読込</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="UtilityLoadXml" class="btn btn-default btn-s page">REST(ドキュメント）</button></td>
            <td><button type="button" id="UtilityLoadXmlList" class="btn btn-default btn-s page">REST（コレクション）※</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="UtilityRemoveDoc" class="btn btn-default btn-s page">ドキュメント削除</button></td>
          </tr>         
        </tbody>
        <tbody>
          <tr>
            <td><button type="button" id="none" class="btn btn-default btn-s page">POST※未済</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td><button type="button" id="none" class="btn btn-default btn-s page">GET※未済</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
        </tbody>
        <thead><tr><td colspan="5">スタッフ取込</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="StaffLoadXml" class="btn btn-default btn-s page">スタッフ読込※</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>         
        </tbody>
        <thead><tr><td colspan="5">ORCA点数マスター取込</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>         
        </tbody>
        <thead><tr><td colspan="5">スタンプリスト読込</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="StampLoadXml" class="btn btn-default btn-s page">ORCA点数マスター取得</button></td>
<script type="text/javascript">

</script>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
          <tr>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
          <tr>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
          <tr>
            <td><button type="button" id="OrcaGetPatientInfo" class="btn btn-success btn-s page">ORCA患者情報取得</button></td>
            <td><button type="button" id="OrcaModifyMedicalInfo" class="btn btn-default btn-s page">医療行為中途データー送信</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
        </tbody>
      </table>
    </div>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
    <script src="js/jquery.base64/jquery.base64.js"></script>
  
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
  <script src="js/Test.js"></script>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  </body>
</html>