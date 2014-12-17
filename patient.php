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
<html>
<head>
    <script src="js/jquery-2.1.1.js"></script>
    <!-- jQuery 2.1.1 -->
    <script src="js/jquery-ui/jquery-ui.js"></script>
    <!-- jQuery-ui 1.11.1 -->
    <link href="js/jquery-ui/jquery-ui.css" rel="stylesheet">
    <!-- jQuery-ui 1.11.1 -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap -->
    <script>
    $(function() {
	    var get = Utility.GetQueryString();

	    var patientId = get['patient'];//console.log(get_patient);

        var doc = Patient.GetInfo(patientId);
        console.log(doc.toString());

        var xsl = Utility.LoadXml('GET', '/eyeehr/xslt/patient.xsl', '');
        console.log(xsl.toString());

        if (document.implementation && document.implementation.createDocument)
        {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            resultDocument = xsltProcessor.transformToFragment(doc, document);
            document.getElementById("example").appendChild(resultDocument);
        }
    });
    </script>
</head>

<div id="example" />

<script src="js/Config/Config.js"></script>
<script src="js/String.js"></script>
<script src="js/Utility/Utility.js"></script>
<script src="js/Patient/Patient.js"></script>

</body>

</html>
