##!/usr/bin/perl
#
#use utf8;
##use strict;
##use warnings;
#
#use RPC::XML;
#use RPC::XML::Client;
#use File::Basename;
#
## 失敗時は"ERROR"が返却される。
#use constant ERROR    => "ERROR";
#
#print "Content-type: text/html\n\n";
#
##--- GET/POST処理は基本ルーチン ---
## GET処理
#if($ENV{'REQUEST_METHOD'} eq "GET"){
#    $buffer = $ENV{'QUERY_STRING'};
#}else{
#    read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
#}
#
#    
#@query = split(/&/, $buffer);
#
#foreach $pair (@query) {
#    ($key, $value) = split(/=/, $pair);
#
#    $value =~ tr/+/ /;
#    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
#    
#    $FORM{$key} = $value;
#}
##--- GET/POST処理は基本ルーチン ---
#
## 実行用XMLを登録する。
#$xml = $FORM{'xml'};
#$filepath = $FORM{'filepath'};
#
## 接続先を設定する。
##print "connecting to $URL...\n";
#$url = "http://admin:zaq12wsx\@localhost:8080/exist/xmlrpc";
#$client = new RPC::XML::Client $url;
#
## ファイルパスに従ったコレクションがない場合は、コレクションを作成する。
## 親のコレクションがなければ自動的に作成する。
## 他のファイルは消えないことを確認した。
#$collectionPath = dirname($filepath);
#$collectionPath =~ s/\/db\///g;
#$collectionPath = $collectionPath . '/';
##print $collectionPath;
#
##print $filepath;
##print $collectionPath;
#
#$request = RPC::XML::request->new('createCollection', $collectionPath); #/db/以降を指定する
#$response = $client->send_request($request);
#if($response->is_fault) 
#{
#    print ERROR;
#    die "An error occurred: " . $response->string . "\n";
#}
#
#$options = RPC::XML::struct->new(
#    'indent' => 'yes'
#    , 'encoding' => 'UTF-8'
#    , 'highlight-matches' => 'none'
#    #, 'process-xsl-pi' => 'yes'
#    #, 'stylesheet' => 'test.xsl'
#);
#
## リクエストにクエリを設定する。0より大きい値では、上書きされる。
#$overwrite = 1;
#
##utf8エンコードを実行する。
#$req = RPC::XML::request->new(
#    "parse", 
#    RPC::XML::base64->new($xml), 
#    $filepath, 
#    $overwrite
#);
#
## リクエストを送信する。
#$response = $client->send_request($req);
#
## エラー発生時はエラーを表示する。
#if($response->is_fault) {
#    #失敗時はエラー文字列を出力する。
#    print ERROR;
#    die "An error occurred: " . $response->string . "\n";
#}
#
## 結果を出力する。
#print $response->value;
#