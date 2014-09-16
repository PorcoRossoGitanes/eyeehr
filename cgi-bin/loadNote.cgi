#!/usr/bin/perl
use RPC::XML;
use RPC::XML::Client;
use Encode;

print "Content-type: text/html\n\n";

#--- GET/POST処理は基本ルーチン ---
# GET処理
if($ENV{'REQUEST_METHOD'} eq "GET"){
	$buffer = $ENV{'QUERY_STRING'};
}else{
	read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
}

	
@query = split(/&/, $buffer);

foreach $pair (@query) {
	($key, $value) = split(/=/, $pair);

	$value =~ tr/+/ /;
	$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
	
	#print $key."=".$value."<br>";
	$FORM{$key} = $value;
}
#--- GET/POST処理は基本ルーチン ---

# 実行用XMLを登録する。
#$xml = $FORM{'xml'};
$filepath  = $FORM{'filepath'};

# クエリを作成する。
# ドキュメントルートノードを明確に記述しなければならない。
#$filepath = "/db/sample/test20140916.xml";
$query = <<END;
for \$item in doc('$filepath') /note
return \$item 
END
#print $query;

# 接続先を設定する。
#print "connecting to $URL...\n";
$url = "http://admin:zaq12wsx\@localhost:8080/exist/xmlrpc";
$client = new RPC::XML::Client $url;
$options = RPC::XML::struct->new(
    'indent' => 'yes'
    , 'encoding' => 'UTF-8'
    , 'highlight-matches' => 'none'
    #, 'process-xsl-pi' => 'yes'
    #, 'stylesheet' => 'test.xsl'
);

# リクエストにクエリを設定する。（MAX件以上は表示されないので、注意する。）
use constant MAX => 1000;
$req = RPC::XML::request->new("query", $query, MAX, 1, $options);

# リクエストを送信する。
$response = $client->send_request($req);

# エラー発生時はエラーを表示する。
if($response->is_fault) {
    die "An error occurred: " . $response->string . "\n";
}

# 結果を出力する。
#print utf8::is_utf8($response->value) ? encode('utf-8', $response->value) : response->value;
print utf8::is_utf8($response->value) ? encode('utf-8', $response->value) : response->value;
