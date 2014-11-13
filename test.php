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
    <h1>電子カルテ テスト</h1>
    <div  class="container">
      <table class="table table-striped">
        <thead><tr><td colspan="5">JQuery関連</td></tr></thead>
        <tbody>
          <tr>
            <td><button type="button" id="UtilityInnerHtml" class="btn btn-default btn-s page">内部HTML取得</button></td>
<script>
$('button#UtilityInnerHtml').click(function () {
  var test = $('<div/>').append('<test><strong>TEST1</strong><br/>TEST2</test>').html();
  $test = $(test); $result = Utility.InnerHtml($test);
  console.log('[' + test + ']=>' + $result);

  var test = '<test/>';
  $test = $(test); $result = Utility.InnerHtml($test);
  console.log('[' + test + ']=>' + $result);

  alert('結果はコンソールに出力されました。');
});
</script>
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
<script>
$('button#UtilityLoadXml').click(function () {
  console.log($(this).text());
  var url = '/db/apps/eyeehr/data/staff/staff-1.xml';
  Utility.LoadXml('REST', url, '', function($xml){
    console.log($xml);
  })
  alert('結果はコンソールに出力されました。');
});
</script>
            <td><button type="button" id="UtilityLoadXmlList" class="btn btn-default btn-s page">REST（コレクション）※</button></td>
<script>
$('button#UtilityLoadXmlList').click(function () {
  console.log($(this).text());
  var url = '/db/apps/eyeehr/data/staff';
  Utility.LoadXml('REST', url, '', function($xml){
    console.log($xml);
  })
  alert('結果はコンソールに出力されました。');
});
</script>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
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
<script>
$('button#StaffLoadXml').click(function () {
  console.log($(this).text());
  var url = '/db/apps/eyeehr/data/staff/staff-1.xml';
  Utility.LoadXml('REST', url, '', function($xml){
    console.log($xml);
  })
  alert('結果はコンソールに出力されました。');
});
</script>
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
// スタンプ情報を読み取る。
$('button#StampLoadXml').click(function(){
  console.log($(this).text());
  var target = new Array(
    "PRACTICE",         //Practice        => "001"    # 診療行為
    "INJECTION",        //Practice/300    => "001-300"  # 注射(300番台)
    "TREATMENT",        //Practice/400    => "001-400"    # 処置(400番台)
    "OPERATION",        //Practice/500    => "001-500"  # 手術(500番台)
    "MEDICAL_CHECK",    //Practice/600    => "001-600"  # 検査(600番台)
    "MEDICAL_PRODUCT",  //Medical_Product   => "002"    # 医薬品
    "MACHINE",          //Machine       => "003"    # 特定機材
    "COMMENT",          //Comment       => "006"    # コメント
    "PRIVATE_EXPENSE"   //Privete_Expense   => "007"    # 自費診療
  );
  $.each(target, function(index, value) {
    Stamp.LoadXml(value, function($result){ 
      $stamps = $result.children();
      console.log("[" + value + "] " + (($stamps.length > 0) ? ("成功" + $stamps.length + "件") : "失敗"));
      console.log($result);
    });
  });
  alert('結果はコンソールに出力されました。');
});
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
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
            <td><button type="button" id="none" class="btn btn-default btn-s page">（未割当）</button></td>
          </tr>
        </tbody>
      </table>
    </div>
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->  
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
  <!--script src="js/Main.js"></script-->
<!--自作JS ※ロードの都合上、本ファイルの末尾で登録する。-->
  </body>
</html>