<?php
$file = 'people.txt';
// ファイルをオープンして既存のコンテンツを取得します
$current = file_get_contents($file);

echo($current);

// 新しい人物をファイルに追加します
$current .= "John Smith\n";

echo($current);

// 結果をファイルに書き出します
file_put_contents($file, $current);
?>