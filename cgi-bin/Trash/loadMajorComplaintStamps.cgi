##!/usr/bin/perl
#use RPC::XML;
#use RPC::XML::Client;
#
#print "Content-type: text/html\n\n";
#
## クエリを作成する。（主訴スタンプを全部取得する。）
#$query = <<END;
#for \$item in collection(/db/apps/eyeehr/data/stamps) /stamps/major-complaint
#return \$item
#END
#
## 接続先を設定する。
##print "connecting to $URL...\n";
#$url = "http://admin:zaq12wsx\@localhost:8080/exist/xmlrpc";
#$client = new RPC::XML::Client $url;
#$options = RPC::XML::struct->new(
#    'indent' => 'yes'
#    , 'encoding' => 'UTF-8'
#    , 'highlight-matches' => 'none'
#    #, 'process-xsl-pi' => 'yes'
#    #, 'stylesheet' => 'test.xsl'
#);
#
## リクエストにクエリを設定する。
#$req = RPC::XML::request->new("query", $query, 1000, 1, $options);
#
## リクエストを送信する。
#$response = $client->send_request($req);
#
## エラー発生時はエラーを表示する。
#if($response->is_fault) {
#    die "An error occurred: " . $response->string . "\n";
#}
#
## 結果を出力する。
##print "<pre>";
#print $response->value;
##print "</pre>";
#