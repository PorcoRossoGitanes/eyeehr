#!/usr/bin/perl

use utf8;
#use strict;
#use warnings;

use RPC::XML;
use RPC::XML::Client;

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
$xml = $FORM{'xml'};
$filepath  = $FORM{'filepath'};

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

# リクエストにクエリを設定する。
#0より大きい値では、上書きされる。
$overwrite = 1;

#utf8エンコードを実行する。
$req = RPC::XML::request->new(
	"parse", 
	RPC::XML::base64->new($xml), 
	$filepath, 
	$overwrite
);

# リクエストを送信する。
$response = $client->send_request($req);

# エラー発生時はエラーを表示する。
if($response->is_fault) {
    die "An error occurred: " . $response->string . "\n";
}

# 結果を出力する。
#print $xml;
print "response";
print $response->value;
