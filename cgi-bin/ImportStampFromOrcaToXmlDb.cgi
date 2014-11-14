#!/usr/bin/perl

#######################################################
# ORCA出力CSVを電子カルテ用XMLに変換する。                
# コンソール呼出時
# @ARGV[0] ファイルパス　　
# @ARGV[1] ファイルタイプ　※1参照
#------------------------------------------------------
# CGI呼出時
# POST/GET file = ファイル名
# 呼出元		：	importOrcaPointData.php
# ファイル依存：	XmlDbUtil.cgi, FileUtil.cgi
#######################################################

#=== 外部ファイル・パッケージ定義 ===#
package eyeehr;

#=== 外部ファイル・パッケージ呼出 ===#
require 'XmlDbUtil.cgi';
require 'FileUtil.cgi';

#use strict;
#use warnings;

# UTF用
use utf8;
use Encode;
#use Jcode;

# ファイルアップロード用
use CGI;
use File::Path;
use File::Copy;
use File::Basename;

# XML-RPC用
use RPC::XML;
use RPC::XML::Client;

#=== ↓↓↓カスタマイズ部↓↓↓ ===#

# データ保存ディレクトリを設定する。（ファイル出力）
my $data_dir = "./data";
# データ保存コレクションを設定する。（XmlDB出力）
my $data_col = "/db/apps/eyeehr/data/Stamp";

# 呼出元フォームの設定を格納する。
# [0]KEY 
# [1]HTMLのNAME属性
# [2]ファイル名
# [3]コレクション
# [4]ORCA : ORCA形式準拠（末尾カスタム追加可）, それ以外:カスタム形式
my @input =
(
	["DISEASE"			,"DISEASE"		,"DISEASE.csv"		,"Disease"			,""		],	# X.病名（所見）
	["PRACTICE"			,"OUTPUT001"	,"OUTPUT001.csv"	,"Practice"			,"ORCA"	],	# 1.診療行為
	["MEDICAL_PRODUCT"	,"OUTPUT002"	,"OUTPUT002.csv"	,"MedicalProduct"	,"ORCA"	], 	# 2.医薬品
	["MACHINE"			,"OUTPUT003"	,"OUTPUT003.csv"	,"Machine"			,"ORCA"	],	# 3.特定機材
	["COMMENT"			,"OUTPUT006"	,"OUTPUT006.csv"	,"Comment"			,"ORCA"	],	# 6.コメント
	["PRIVATE_EXPENSE"	,"OUTPUT007"	,"OUTPUT007.csv" 	,"PrivateExpense"	,"ORCA"	]#,	# 7.自費診療
);


#=== XMLDB XMLタグ ===#
my %tag = 
(
	"STAMP" 					=> "Stamp",
	"ORCA" 						=> "Orca",
	"MEDICAL_CLASS" 			=> "Medical_Class",				#診療種別区分
	"MEDICATION_CODE" 			=> "Medication_Code",			#診療行為コード
	"MEDICATION_NAME" 			=> "Medication_Name",			#診療行為名称
	"MEDICATION_NUMBER" 		=> "Medication_Number",			#診療行為数量
	"MEDICATION_GENERIC_FLG" 	=> "Medication_Generic_Flg", 	#診療行為一般処方指示
	"MEDICATION_UNIT_POINT" 	=> "Medication_Unit_Point",		#診療行為単位点数
	"MEDICATOIN_UNIT" 			=> "Medication_Unit",			#診療行為単位
	"EYEEHR" 					=> "Eyeehr",					#電子カルテ用					
	"TITLE" 					=> "Title"#,					#電子カルテ用	スタンプタイトル				
);

my %default_value = 
(
	"MEDICATION_GENERIC_FLG_DEFAULT" => "yes"#,				#診療行為一般処方指示[初期値:YES]
);


#=== ↑↑↑カスタマイズ部↑↑↑ ===#

#=== Perl BOOLEAN 定義 ===#
use constant TRUE => 1;
use constant FALSE => 0;

#=== ORCA関連仕様===#
#ファイルタイプ=1, 診療行為CSVの場合に使用する。
#my %practice_in;
#$practice_in{'INJECTION'} 		= 300;	# 注射(300番台)
#$practice_in{'TREATMENT'} 		= 400;	# 処置(400番台)
#$practice_in{'OPERATION'} 		= 500;	# 手術(500番台)
#$practice_in{'MEDICAL_CHECK'} 	= 600;	# 検査(600番台)

#ファイルタイプ　※1
#my @len = 
#(
#	-1,		# 0.(未定義の場合=-1)
#	25, 	# 1.診療行為
#	16,		# 2.医薬品
#	18,		# 3.医薬品
#	-1,		# 4.(未定義の場合=-1)
#	-1,		# 5.(未定義の場合=-1)
#	23, 	# 6.特定機材
#	18#,	# 7.自費診療
#);

# プログラム変数
my $csv; 		# CSVファイル（コマンド実行時、ファイルパス。CGI実行時、value値）
my $debug; 		# デバッグ表示を実行する場合は0以外, デバック表示を実行しない場合は0
my $toXmlDB;	# XMLDBに保存する場合、TRUE。ファイルを展開する場合、false。 

# 既存のコレクションを格納していく（チューニングのため）
#my @collection_exist;

print "Content-type: text/html\n\n";

# CGI実行
my $query = new CGI;

# ファイル名を取得する。
foreach my $input(@input)
{
	my $csv; 							#CSV文字列

	my $key = @{$input}[0];				#キー
	my $name = @{$input}[1];			#name属性
	my $filename_fix = @{$input}[2];	#ファイル名（固定）
	my $collection = @{$input}[3];		#保存先コレクション(Stampコレクションからの相対パス)
	my $orca = @{$input}[4];			#ORCA形式確認

	# ファイル名を取得する。
	my $filename = $query->param($name);

	# ファイルが指定されているか、確認する。
	if ($filename ne $filename_fix) 
	{
		print "<div class='error' style='font-size:9pt;white-space:nowrap;'>";
		print "正しいファイルが指定されていません。";
		print "[入力] $name [正しいファイル名] $filename_fix [入力されたファイル名] $filename";
		print "</div>";
		print "<hr/>";
		next;
	}

	# ファイルを読み込み、XMLDBに保存する。
	{
		print "<div class='input' style='font-size:9pt;white-space:nowrap;'>";
		print "[入力] $name [入力されたファイル名] $filename";
		print "</div>";

		#ファイルからCSVを読み込む。
		$csv = ""; while(read($filename,$buffer,1024)) { $csv .= $buffer;} close($filename); 
	}

	# 文字コードがEUC-JPの場合は、UTF-8に変換する。
	if($key ne "DISEASE"){
		Encode::from_to($csv, 'eucjp', 'utf8'); 
	}

	{
		# XMLDBに書出す。
		$toXmlDB = TRUE;

		#デバッグフラグをOFFに設定する。
		$debug = FALSE;

		# フォームの内容から値を取得する。
		&ExportXmlFromForm(
			$key,
			$orca,
			$csv, 			# CSVデータを格納する。
			$toXmlDB,		# XMLDBに保存する。
			$collection, 	# コレクションを指定する。
			$debug			#,	# デバッグ表示を実行する場合は0以外, デバック表示を実行しない場合は0
		);	

		print "<hr/>";
	}
}

### @summary 	フォームからXML文字列を取得し、XMLに変換する。
### @param 		$file_type 	ファイルタイプ
### @param 		$csv 		CSV文字列
### @param 		$debug      デバッグプリントする場合はTRUE, デバッグプリントしない場合はFALSE
sub ExportXmlFromForm
{
	# 引数を取得する。
	my ($key, $orca, $csv, $toXmlDB, $collection, $debug) = @_;

	my $line_cnt = 0;	# データ行数をカウントする。
	my $exec_cnt = 0;	# 実行成功行数をカウントする。

	# データ退避用のディレクトリを作成する。
	if ($toXmlDB eq FALSE) 
	{
		$current_dir = &FileUtil::MakeDir($data_dir); 
	}
	else 
	{
		$current_col = &XmlDbUtil::CreateCollection($data_col); 
		#push(@collection, $current_col);
		#print "$current_col\n";
	}

	my @lines = split(/\n/, $csv);
	$line_cnt = @lines;
	foreach my $line(@lines){
		my $xml = &lineToXml($key, $orca, $line, $toXmlDB, $collection, $debug);
		if ($xml ne "") {$exec_cnt += 1;}
	}

	print "<div class='result' style='font-size:9pt;white-space: nowrap;'>";
	print $exec_cnt . "/" . $line_cnt . "が成功した。";
	print "</div>";
}

### @summary 	1行のデータをXMLに変換する。
### @param		$key 		キー
### @param 		$orca 		"ORCA" : ORCA形式、その他：カスタム形式
### @param 		$file_type 	ファイルタイプ
### @param 		$line 		1行のデーター
### @return 	$ret 		XML(失敗時、空文字列)
sub lineToXml 
{ 
 	# 戻り値を用意する。
	#変換されたXMLデータを格納する。
	my $ret = "";

	# 引数を取得する。
	my ($key, $orca, $line, $toXmlDB, $collection, $debug) = @_;

	#改行を削除する。
	#chomp($line);	

	# カンマ区切りを分割する。
	my @item = split(/,/, $line);
	my $length = @item;

	#CSVのデーターを格納する。
	my $id = -1;
	my $medical_class = "";
	my $medication_code = "";
	my $medication_name = "";
	my $medication_unit_point = 0; # 単位点数
	my $medication_unit = "";
	my $medication_number = 1;
	my $medication_generic_flg = MEDICATION_GENERIC_FLG_DEFAULT;

	my $title = "";

	# 現在のディレクトリを格納する。
	my $current_dir = "";
	my $current_col = "";

	if ($toXmlDB eq FALSE) 
	{ 
		# 保存ディレクトリを用意する。
		$current_dir = $data_dir  . "/" . $collection;
		$current_dir = &FileUtil::MakeDir($current_dir); 
	}
	else 
	{ 
		# 保存コレクションを用意する。
		$current_col = $data_col . "/" . $collection;
		$current_col = &XmlDbUtil::CreateCollection($current_col); 
	}

	if ($key eq "DISEASE")
	{
		#use constant DISEASE => X; 		# 病名・所見
		if ($length > 1)#== $len[PRACTICE])
		{
			#$medical_class 			= $item[9];
			#$medication_code 		= $item[1];
			#$medication_name 		= $item[4];			
			#$medication_unit_point 	= $item[5];
			#$medication_unit 		= $item[6];
			$id = $item[0];
			$title = $item[1];
		} 
	}
	elsif ($key eq "PRACTICE")
	{
		#use constant PRACTICE => 1; 		# 診療行為
		if ($length > 9)#== $len[PRACTICE])
		{
			$medical_class 			= $item[9];
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];			
			$medication_unit_point 	= $item[5];
			$medication_unit 		= $item[6];
			$id = $medication_code;
			$title = $medication_name;
		} 
	}
	elsif ($key eq "MEDICAL_PRODUCT")
	{
		#use constant MEDICAL_PRODUCT => 2; # 医薬品
		if ($length > 6)#== $len[MEDICAL_PRODUCT])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			$medication_unit 		= $item[6];
			$id = $medication_code;
			$title = $medication_name;
		}
	}
	elsif ($key eq "MACHINE")
	{
		#use constant MACHINE => 3; 		# 特定機材
		if ($length > 7)#== $len[MACHINE])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[5];	
			$medication_unit_point 	= $item[6];
			$medication_unit 		= $item[7];
			$id = $medication_code;
			$title = $medication_name;
		}
	}
	elsif ($key eq "COMMENT")
	{
		#use constant COMMENT => 6; 		# コメント
		if ($length > 5) #== $len[COMMENT])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			#$medication_unit 		= $item[7]; #見つからない
			$id = $medication_code;
			$title = $medication_name;
		}
	}
	elsif ($key eq "PRIVATE_EXPENSE")
	{
		#use constant PRIVATE_EXPENSE =>7;	# 自費診療
		if ($length > 5)#== $len[PRIVATE_EXPENSE])
		{
			#$medical_class 		= $item[9]; #見つからない
			$medication_code 		= $item[1];
			$medication_name 		= $item[4];	
			$medication_unit_point 	= $item[5];
			#$medication_unit 		= $item[7]; #見つからない
			$id = $medication_code;
			$title = $medication_name;
		}
	}

	# 診療区分番号があれば、コレクション・フォルダを分割する。
	if ($medical_class ne "")
	{
		if ($toXmlDB eq FALSE) 
		{
			$current_dir = &FileUtil::MakeDir($current_dir . "/" . $medical_class); 
		}
		else 
		{ 	
			$current_col = &XmlDbUtil::CreateCollection($current_col . "/" . $medical_class); 
			#push(@collection, $current_col);
		}			
	}

	my $xml = 
	"<$tag{'STAMP'}>\r\n" .		
	"\t<$tag{'ORCA'}>\r\n" .
	"\t\t<$tag{'MEDICAL_CLASS'}>$medical_class</$tag{'MEDICAL_CLASS'}>\r\n" .
	"\t\t<$tag{'MEDICATION_CODE'}>$medication_code</$tag{'MEDICATION_CODE'}>\r\n" .
	"\t\t<$tag{'MEDICATION_NAME'}>$medication_name</$tag{'MEDICATION_NAME'}>\r\n" .
	"\t\t<$tag{'MEDICATION_NUMBER'}>$medication_number</$tag{'MEDICATION_NUMBER'}>\r\n" .
	"\t\t<$tag{'MEDICATION_GENERIC_FLG'}>$medication_generic_flg</$tag{'MEDICATION_GENERIC_FLG'}>\r\n" .
	"\t\t<$tag{'MEDICATION_UNIT_POINT'}>$medication_unit_point</$tag{'MEDICATION_UNIT_POINT'}>\r\n" .
	"\t\t<$tag{'MEDICATOIN_UNIT'}>$medication_unit</$tag{'MEDICATOIN_UNIT'}>\r\n" .
	"\t</$tag{'ORCA'}>\r\n" . 
	"\t<$tag{'EYEEHR'}>\r\n" . 
	"\t\t<$tag{'TITLE'}>$title</$tag{'TITLE'}>\r\n" . 
	"\t</$tag{'EYEEHR'}>\r\n" . 
	"</$tag{'STAMP'}>\r\n";

	#【デバッグ用】XMLを標準出力する。
	if ($debug == TRUE) { print "<textarea>$xml</textarea>"; }

	# ファイルを書き出す。
	my $filepath;
	my $result;
	my $filename = $collection . "-" . $medication_code . ".xml";
	if ($toXmlDB eq FALSE) 
	{
		$filepath = $current_dir . "/" . $filename;
		$result = &FileUtil::SaveXml($filepath, $xml);
	}
	else 
	{ 	
		$filepath = $current_col . "/" . $filename;
		$result = &XmlDbUtil::SaveDoc($filepath, $xml); 
	}

	print "<div class='line' style='font-size:9pt;white-space:nowrap;'>";
	if ($result eq "") 
	{ 
		print "[NG] "; 
	}
	else 
	{
		print "[OK] ";
	}
	print "$result ";
	print "$line $filepath";
	print "</div>";

	$ret = $xml;

	return $ret;
}
