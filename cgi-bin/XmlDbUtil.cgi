package XmlDbUtil;

use utf8;
#use strict;
#use warnings;

use RPC::XML;
use RPC::XML::Client;
use File::Basename;

my $user 		= "admin";
my $password 	= "zaq12wsx";

### @summary 	XML-DBコレクションをXMLDBに作成する。
### @param 		コレクションパス(/db/apps/eyeehr/data/stamp)
### @return 	成功時、コレクションパス。失敗時、空文字列。
sub CreateCollection
{
	# 戻り値を用意する。
	my $ret = "";

	use constant ERROR_CREATE_COLLECTION => "ERR:コレクションの作成に失敗しました。";

	# 接続先を設定する。
	#print "connecting to $URL...\n";
	my $url = "http://" . $user . ":" . $password . "\@localhost:8080/exist/xmlrpc";
	my $client = new RPC::XML::Client $url;

	# 引数を取得する。
	my ($collectionPath) = @_;

	my $request = RPC::XML::request->new('createCollection', $collectionPath);
	my $response = $client->send_request($request);
	my $ret = $collectionPath;

	if($response->is_fault) 
	{
		print(ERROR_CREATE_COLLECTION . " (" . $collectionPath . ")");
	    die(ERROR_CREATE_COLLECTION . " " . $response->string . " \n");
	}

	return $ret;
}

### @summary XMLドキュメントをXMLDBに保存する。
### @param $filepath 	ファイルパス
### @param $xml 		XMLデーター
### @return 成功時、ファイルパス。失敗時、空文字列。
sub SaveDoc
{
	# 戻り値を用意する。
	my $ret = "";

	use constant ERROR_SAVE_DOC => "ERR:XML文書の保存に失敗しました。";

	my ($filepath, $xml) = @_;

	# 接続先を設定する。
	#print "connecting to $URL...\n";
	my $url = "http://" . $user . ":" . $password . "\@localhost:8080/exist/xmlrpc";
	
	my $client = new RPC::XML::Client $url;

	#オプションを設定する。
	#my $options = RPC::XML::struct->new
	#(
	#    	'indent' => 'yes'
	#    , 	'encoding' => 'UTF-8'
	#    , 	'highlight-matches' => 'none'
	#    #, 	'process-xsl-pi' => 'yes'
	#    #, 	'stylesheet' => 'test.xsl'
	#);

	# リクエストにクエリを設定する。0より大きい値では、上書きされる。
	my $overwrite = 1;

	#utf8エンコードを実行する。
	$req = RPC::XML::request->new(
		"parse", 
		RPC::XML::base64->new($xml), 
		$filepath, 
		$overwrite
	);

	# リクエストを送信する。
	my $response = $client->send_request($req);

	#失敗時はエラー文字列を出力する。
	if($response->is_fault) {
		print(ERROR_SAVE_DOC . " " . $response->string);
	    die(ERROR_SAVE_DOC . " " . $response->string . "\n");
	}

	my $ret = $filepath;

	# 結果を出力する。
	#print $response->value;

	return $ret;
}

1; # 真値を返す。