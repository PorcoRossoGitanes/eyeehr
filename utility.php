<?php

$fp = fopen("smb://192.168.24.206/Share/個人ファイル/小林祥子/tmp/sample.txt", "w");
$result = fwrite($fp, "ファイルへの書き込みサンプル");
echo $result;
fclose($fp);

?>