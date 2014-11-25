#!/usr/bin/ruby

require "cgi"				# CGIモジュールを追加する。
require 'OrcaManager.rb'	# ORCA接続マネージャを追加する。


######################################################################
# メイン処理：指定の患者番号の患者情報を取得する。
# [POST] 	patient_id:患者番号(0埋めなし)
# [参照]		http://www.orca.med.or.jp/receipt/tec/api/patientget.html
# [_host, _port, _user, _pswd] : 設定ファイルから取得する。
# @dependency cgi
######################################################################

# POST値から
# （１）患者ID
#を取得する。
_cgi = CGI.new();
_id = _cgi['patient_id'];

# ORCAに接続し、ORCAの患者情報を取得する。
_om = OrcaManager.new();
_result, _xml, _message = _om.GetPatientInfo(_id);


# CGIの実行結果を出力する。
print("Content-type: text/html\n\n");

# デバック用（コンソール）
#puts(_result, _xml, _message);

# デバック用（HTTPD）
#puts(<<"HTML");
#<html><body><textarea cols="400" rows="100">
#HTML

puts(_xml);

#puts(<<"HTML");
#</textarea></body></html>
#HTML
