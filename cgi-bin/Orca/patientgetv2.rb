#!/usr/bin/ruby

require "cgi"

require 'uri'
require 'net/http'
Net::HTTP.version_1_1

######################################################################
# ORCA接続マネージャー
######################################################################
class OrcaManager #< Super
	
	##################################################################
	# 初期化
	##################################################################
	def initialize()
	  	# TODO : ログイン情報は設定ファイルに格納する。
		@host = "192.168.24.100";
		@port = "8000";
		@user = "ormaster";
		@pswd = "ormaster123";
	end
	##################################################################
	# 患者情報を取得する。
	# @param i_patient_id 患者情報
	# @return 
	# _result	結果 true=成功。false=失敗。
	# _xml 		成功時、XML。失敗時、空文字列。
	# _message　メッセージ。
	# @dependency uri, net/http
	##################################################################
	def GetPatientInfo(i_patient_id)
		_result = true;
		_xml = "";
		_message = "";
		
		#print("patient_id", i_patient_id, i_patient_id.class, "\n");
		
		# 妥当性を確認する。
		if (_result) then
			if (i_patient_id.length <= 0) then _result = false; _message = "患者IDが未指定です。"; end;
		end
		if (_result) then
			if (i_patient_id =~ /^[1-9][0-9]*/) then else _result = false; _message = "患者IDが不正です。"; end;
		end

		# TODO : 接続を確認する。
			
		# 指定の患者IDの患者情報を取得する
		if (_result) then
			_req = Net::HTTP::Get.new("/api01rv2/patientgetv2?id=#{i_patient_id}");

			# ORCAサーバーへBASIC認証情報を設定する。
			_req.basic_auth(@user, @pswd);

			Net::HTTP.start(@host, @port) { |_http|
			  _res = _http.request(_req);
			  _xml = _res.body;
			}
		end	

		# 処理結果、XML、メッセー時を返却する。
		return _result, _xml, _message
	end
end

######################################################################
# メイン処理：指定の患者番号の患者情報を取得する。
# [POST] 	patient_id:患者番号(0埋めなし)
# [参照]		http://www.orca.med.or.jp/receipt/tec/api/patientget.html
# [_host, _port, _user, _pswd] : 設定ファイルから取得する。
######################################################################

# POST値から
# （１）患者ID
#を取得する。
_cgi = CGI.new();
_id = _cgi['patient_id'];

# ORCAに接続し、ORCAの患者情報を取得する。
_om = OrcaManager.new();
_result, _xml, _message = _om.GetPatientInfo(_id);

#puts(_result, _xml, _message);
print("Content-type: text/html\n\n");
#puts(<<"HTML");
#<html><body><textarea cols="400" rows="100">
#HTML

puts(_xml);

#puts(<<"HTML");
#</textarea></body></html>
#HTML
