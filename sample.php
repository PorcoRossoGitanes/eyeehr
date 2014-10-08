<?php
$xml = "sample.xml";//ファイルを指定
$xmlData = simplexml_load_file($xml);//xmlを読み込む
?>
<ul>
<?php foreach ($xmlData->channel->item as $data) { ?>
    <li>
        <p>
            <a href="<?php echo $data->link; ?>"><?php echo $data->title; ?></a>
        </p>
    </li>
<?php } ?>
</ul>