#!/usr/bin/perl

#######################################################
# ORCA出力CSVを電子カルテ用XMLに変換する。                
# コンソール呼出時
# @ARGV[0] ファイルパス　　
# @ARGV[1] ファイルタイプ　※1参照
#------------------------------------------------------
# CGI呼出時
# POST/GET file = ファイル名
#######################################################

package eyeehr;

#use strict;
#use warnings;

use File::Path;

# UTF用
use utf8;
# UTF用
use Encode;

# ファイルアップロード用
use CGI;
use File::Copy;
use File::Basename;

# XML-RPC用
use RPC::XML;
use RPC::XML::Client;

# BOOLEAN
use constant TRUE => 1;
use constant FALSE => 0;

#ファイルタイプ　※1
use constant 
{
	PRACTICE 			=> 001, 	# 診療行為
	MEDICAL_PRODUCT 	=> 002, 	# 医薬品
	MACHINE 			=> 003, 	# 特定機材
	COMMENT 			=> 006, 	# コメント
	PRIVATE_EXPENSE 	=> 007,	# 自費診療
};

#コレクション名
my @collection = 
(
	"",
	"Practice", 			# 1.診療行為
	"MedicalProduct",		# 2.医薬品
	"Machine",				# 3.医薬品
	"",
	"",
	"Comment", 				# 6.特定機材
	"PrivateExpense"#,	 	# 7.自費診療
);
#use constant COLLECTION_PRACTICE => "Practice"; 				# 診療行為
#use constant COLLECTION_MEDICAL_PRODUCT => "MedicalProduct"; 	# 医薬品
#use constant COLLECTION_MACHINE => "Machine"; 					# 特定機材
#use constant COLLECTION_COMMENT => "Comment"; 					# コメント
#use constant COLLECTION_PRIVATE_EXPENSE => "PrivateExpense";	# 自費診療

#ファイルタイプ　※1
my @len = 
(
	-1,
	25, 	# 1.診療行為
	16,		# 2.医薬品
	18,		# 3.医薬品
	-1,
	-1,
	23, 	# 6.特定機材
	18#,	# 7.自費診療
);
#use constant LEN_PRACTICE => 25; 			# 診療行為
#use constant LEN_MEDICAL_PRODUCT => 16; 	# 医薬品
#use constant LEN_MACHINE => 18; 			# 特定機材
#use constant LEN_COMMENT => 23; 			# コメント
#use constant LEN_PRIVATE_EXPENSE =>18;		# 自費診療


#ファイルタイプ=1, 診療行為CSVの場合に使用する。
my %practice_in;
$practice_in{'INJECTION'} 		= 300;
$practice_in{'TREATMENT'} 		= 400;
$practice_in{'OPERATION'} 		= 500;
$practice_in{'MEDICAL_CHECK'} 	= 600;

#use constant INJECTION => 300; # 注射は、医療行為CSVの300番台
#use constant TREATMENT => 400; # 処置は、医療行為CSVの400番台
#use constant OPERATION => 500; # 手術は、医療行為CSVの500番台
#use constant MEDICAL_CHECK => 600; # 検査は、医療行為CSVの600番台

use constant MEDICATION_GENERIC_FLG_DEFAULT => "yes"; #診療行為一般処方指示[初期値:YES]

print "Content-type: text/html\n\n";

#--- GET/POST処理は基本ルーチン ---
# GET処理
#if($ENV{'REQUEST_METHOD'} eq "GET"){ $buffer = $ENV{'QUERY_STRING'};}
#else{ read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});}
#
#@query = split(/&/, $buffer);
#
#foreach $pair (@query) {
#	($key, $value) = split(/=/, $pair);
#	$value =~ tr/+/ /;
#	$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
#	$FORM{$key} = $value;
#}
#--- GET/POST処理は基本ルーチン ---

my 
(
	$file_type,	# ファイルタイプを取得する。(上記定数参照。診療行為の場合は1、医薬品の場合は2...) 
	$csv, 		# CSVファイル（コマンド実行時、ファイルパス。CGI実行時、value値）
	$debug, 		# デバッグ表示を実行する場合は0以外, デバック表示を実行しない場合は0
	$toXmlDB	# XMLDBに保存する場合、TRUE。ファイルを展開する場合、false。 
);

# データ保存ディレクトリを設定する。
my $data_dir = "./data";
# データ保存コレクションを設定する。
my $data_col = "/db/apps/eyeehr/data";

my $argv_length = @ARGV;
if ($argv_length > 0)
{
    # コマンド実行	
	if ($argv_length == 3)
	{
		$file_type 	= $ARGV[1];
		$csv 		= $ARGV[0];
		$debug 		= $ARGV[2];
		$toXmlDB    = FALSE;

		&ExportXml(
			$file_type,  	# ファイルタイプを取得する。(上記定数参照。診療行為の場合は1、医薬品の場合は2...)
			$csv, 			# 取込用のファイルパスを取得する。(../tmp/orca/OUTPUT001（診療行為）.csv)
			$toXmlDB,		# XMLDBに保存する。
			$debug			#,	# デバッグ表示を実行する場合は0以外, デバック表示を実行しない場合は0
		);
	} else 
	{
		die(
			"処理系の呼出しに失敗しました。\n" .
			"ARGV[0] ファイルパス\n" .
			"ARGV[1] ファイルタイプ\n" .
			"ARGV[2] デバッグ 0=FALSE 0以外=TRUE\n"
		);
	}	
}
else 
{
	# CGI実行
	my $query = new CGI;

	# ファイル名を取得する。
	my $filename = $query->param('filename'); #print "[FILE_NAME] $filename<br/>";

	# ファイルタイプを取得する。（行頭の0を削除する。）
	my $file_type = substr($filename, 6,3); $file_type =~ s/^0+//g; #print "[FILE_TYPE] $file_type<br/>";

	#ファイルからCSVを読み込む。
	my $csv = ""; while(read($filename,$buffer,1024)) { $csv .= $buffer;} close($filename); 

	#デバッグフラグをONに設定する。
	$debug = TRUE;

	# XMLDBに書出す。
	$toXmlDB = TRUE;

	&ExportXmlFromForm(
		$file_type,  	# ファイルタイプを取得する。(上記定数参照。診療行為の場合は1、医薬品の場合は2...)
		$csv, 			# CSVデータを格納する。
		$toXmlDB,		# XMLDBに保存する。
		$debug			#,	# デバッグ表示を実行する場合は0以外, デバック表示を実行しない場合は0
	);
}

### @summary 	フォームからXML文字列を取得し、XMLに変換する。
### @param 		$file_type 	ファイルタイプ
### @param 		$csv 		CSV文字列
### @param 		$debug      デバッグプリントする場合はTRUE, デバッグプリントしない場合はFALSE
sub ExportXmlFromForm
{
	# 引数を取得する。
	my ($file_type, $csv, $toXmlDB, $debug) = @_;

	my $line_cnt = 0;	# データ行数をカウントする。
	my $exec_cnt = 0;	# 実行成功行数をカウントする。

	# データ退避用のディレクトリを作成する。
	if ($toXmlDB eq FALSE) 
	{
		$current_dir = &MakeDir($data_dir ); 
	}
	else 
	{
		$current_col = &CreateCollection($data_col); 
		print "$current_col\n";
	}

	print "<textarea cols=50 rows=20>";
	my @lines = split(/\n/, $csv);
	$line_cnt = @lines;
	foreach my $line(@lines){
		#print "[LINE]$line<br/>";
		my $xml = &lineToXml($file_type, $line, $toXmlDB);
		if ($xml ne "") {$exec_cnt += 1;}
	}
	print($exec_cnt . "/" . $line_cnt . "が成功した。\n");
	print "</textarea>";
}

### @summary CSVからXMLに変換する。
### @param $file_type　ファイルタイプ
### @param $file_path　元データのファイルパス
### @param $debug      デバッグプリントする場合はTRUE, デバッグプリントしない場合はFALSE
sub ExportXml
{
	# 引数を取得する。
	my ($file_type, $file_path, $toXmlDB, $debug) = @_;
	#print "file_type $file_type $collection[$file_type]\n";

	# データ行数をカウントする。
	my $line_cnt = 0;
	# 実行成功行数をカウントする。
	my $exec_cnt = 0;

	# データ退避用のディレクトリを作成する。
	if ($toXmlDB eq FALSE) 
	{
		$current_dir = &MakeDir($data_dir ); 
	}
	else 
	{
		$current_col = &CreateCollection($data_col); 
		print "$current_col\n";
	}

	# ファイルを読み込む。（ファイルを読み込めない場合はスクリプト終了する。）
	open(DATAFILE, "< $file_path") or die("error :$!");

	# 1行ずつ読み込み、標準出力する。
	while (my $line = <DATAFILE>)
	{
		my $xml = &lineToXml($file_type, $line, $toXmlDB);
		$line_cnt += 1; if ($xml ne "") {$exec_cnt += 1;}
	}

	print($exec_cnt . "/" . $line_cnt . "が成功した。");
}

### @summary 	1行のデータをXMLに変換する。
### @param 		$file_type 	ファイルタイプ
### @param 		$line 		1行のデーター
### @return 	$ret 		XML(失敗時、空文字列)
sub lineToXml 
{ 
 	# 戻り値を用意する。
	#変換されたXMLデータを格納する。
	my $ret = "";

	use constant Stamp => "Stamp";
	use constant ORCA => "Orca";
	use constant MEDICAL_CLASS => "Medical_Class";	#診療種別区分
	use constant MEDICATION_CODE => "Medication_Code";	#診療行為コード
	use constant MEDICATION_NAME => "Medication_Name";	#診療行為名称
	use constant MEDICATION_NUMBER => "Medication_Number";	#診療行為数量
	use constant MEDICATION_GENERIC_FLG => "Medication_Generic_Flg"; #診療行為一般処方指示
	use constant MEDICATION_UNIT_POINT => "Medication_Unit_Point";	#診療行為単位点数
	use constant MEDICATOIN_UNIT => "Medication_Unit";				#診療行為単位

	# 引数を取得する。
	my ($file_type, $line, $toXmlDB) = @_;

	#改行を削除する。
	#chomp($line);	

	# EUC-JPをUTF8に変換する。
	Encode::from_to($line, 'eucjp', 'utf8'); 
	#print "$line";

	# カンマ区切りを分割する。
	my @item = split(/,/, $line);
	my $length = @item;

	#CSVのデーターを格納する。
	my $medical_class = "";
	my $medication_code = "";
	my $medication_name = "";
	my $medication_unit_point = 0; # 単位点数
	my $medication_unit = "";
	my $medication_number = 1;
	my $medication_generic_flg = MEDICATION_GENERIC_FLG_DEFAULT;

	# 現在のディレクトリを格納する。
	my $current_dir = "";
	my $current_col = "";

	# 保存ディレクトリを用意する。
	#print "file_type $file_type collection $collection{1}";
	
	if ($toXmlDB eq FALSE) 
	{ 
		$current_dir = $data_dir  . "/" . $collection[$file_type];
		$current_dir = &MakeDir($current_dir); 
	}
	else 
	{ 
		$current_col = $data_col . "/" . $collection[$file_type];
		$current_col = &CreateCollection($current_col); 
		#print "$current_col\n";
	}

	if ($file_type eq PRACTICE)
	{
		#use constant PRACTICE => 1; 		# 診療行為
		#print "[FILE_TYPE] $file_type " . PRACTICE . "<br/>";
		if ($length == $len[PRACTICE])
		{
			$medical_class 			= $item[9];
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];			
			$medication_unit_point 	= $item[5];
			$medication_unit 		= $item[6];
		} 
	}
	elsif ($file_type eq MEDICAL_PRODUCT)
	{
		#use constant MEDICAL_PRODUCT => 2; # 医薬品
		if ($length == $len[MEDICAL_PRODUCT])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			$medication_unit 		= $item[6];
		}
	}
	elsif ($file_type eq MACHINE)
	{
		#use constant MACHINE => 3; 		# 特定機材
		if ($length == $len[MACHINE])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[5];	
			$medication_unit_point 	= $item[6];
			$medication_unit 		= $item[7];
		}
	}
	elsif ($file_type eq COMMENT)
	{
		#use constant COMMENT => 6; 		# コメント
		if ($length == $len[COMMENT])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			#$medication_unit 		= $item[7]; #見つからない
		}
	}
	elsif ($file_type eq PRIVATE_EXPENSE)
	{
		#use constant PRIVATE_EXPENSE =>7;	# 自費診療
		if ($length == $len[PRIVATE_EXPENSE])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			#$medication_unit 		= $item[7]; #見つからない
		}
	}

	# 診療コードがあるデータのみ出力する。
	if ($medication_code ne "")
	{
		# 診療区分番号によってフォルダを分割する。
		if ($toXmlDB eq FALSE) 
		{
			$current_dir = &MakeDir($current_dir . "/" . $medical_class); 
		}
		else 
		{ 	
			$current_col = &CreateCollection($current_col . "/" . $medical_class); 
			print "$current_col\n";
		}

		my $xml = 
		"<" . STAMP. ">\n" .		
		"\t<" . ORCA. ">\n" .
		"\t\t<" . MEDICAL_CLASS          . ">" . $medical_class          . "</" . MEDICAL_CLASS          . ">\n" .
		"\t\t<" . MEDICATION_CODE        . ">" . $medication_code        . "</" . MEDICATION_CODE        . ">\n" .
		"\t\t<" . MEDICATION_NAME        . ">" . $medication_name        . "</" . MEDICATION_NAME        . ">\n" .
		"\t\t<" . MEDICATION_NUMBER      . ">" . $medication_number      . "</" . MEDICATION_NUMBER      . ">\n" .
		"\t\t<" . MEDICATION_GENERIC_FLG . ">" . $medication_generic_flg . "</" . MEDICATION_GENERIC_FLG . ">\n" .
		"\t\t<" . MEDICATION_UNIT_POINT  . ">" . $medication_unit_point  . "</" . MEDICATION_UNIT_POINT  . ">\n" .
		"\t\t<" . MEDICATOIN_UNIT        . ">" . $medication_unit        . "</" . MEDICATOIN_UNIT        . ">\n" .
		"\t</" . ORCA . ">\n" . 
		"</" . STAMP . ">\n";

		#【デバッグ用】XMLを標準出力する。
		#print $debug;
		if ($debug == TRUE) { print $xml; }

		# ファイルを書き出す。
		my ($filepath, $result);
		my $filename = $collection[$file_type] . "-" . $medication_code . ".xml";
		if ($toXmlDB eq FALSE) 
		{
			$filepath = $current_dir . "/" . $filename;
			$result = &SaveXml($filepath, $xml);
		}
		else 
		{ 	
			$filepath = $current_col . "/" . $filename;
			$result = &SaveDoc($filepath, $xml); 
		}


		#print $result . "\n";
		$ret = $xml;
	}

	return $ret;
}

### @summary	ディレクトリを作成する。
### @param 		ディレクトリパス
### @return		成功時、ディレクトリパス。失敗時、空文字列。
sub MakeDir 
{
	# 戻り値
	my $ret = "";

	# 引数を取得する。
	my ($dirpath) = @_;

	if (!-d $dirpath) { mkdir $dirpath or die "$!:$dirpath"; }

	$ret = $dirpath;

	return $ret;
}

### @summary 	XMLを書出す。
### @param 		$filepath 	ファイルパス
### @param 		$xml 		XML文書
### @ret 		成功時、XML文書。失敗時、空文字列。
sub SaveXml
{
	# 戻り値
	my $ret = "";

	use constant ERROR_SAVE_XML => "ERR:ファイルの保存に失敗しました。";

	# 引数を取得する。
	my ($filepath, $xml) = @_;

	open(FILE, ">$filepath") or die(ERROR_SAVE_XML . " $!");
	print FILE $xml;
	close (FILE);
	$ret = $filepath;

	return $ret;
}

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
	$url = "http://admin:zaq12wsx\@localhost:8080/exist/xmlrpc";
	$client = new RPC::XML::Client $url;

	# 引数を取得する。
	my ($collectionPath) = @_;

	my $request = RPC::XML::request->new('createCollection', $collectionPath);
	$response = $client->send_request($request);
	$ret = $collectionPath;

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
	$url = "http://admin:zaq12wsx\@localhost:8080/exist/xmlrpc";
	$client = new RPC::XML::Client $url;

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

	#失敗時はエラー文字列を出力する。
	if($response->is_fault) {
		print(ERROR_SAVE_DOC . " " . $response->string);
	    die(ERROR_SAVE_DOC . " " . $response->string . "\n");
	}

	# 
	$ret = $filepath;

	# 結果を出力する。
	#print $response->value;

	return $ret;
}


