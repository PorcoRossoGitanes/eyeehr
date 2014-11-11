package FileUtil;

#use File::Path;

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

1;