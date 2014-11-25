#!/usr/bin/ruby

require 'uri'
require 'net/http'
Net::HTTP.version_1_1

######################################################################
# @summary ORCA接続マネージャー
# @dependency uri, net/http
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
	# @summary ORCAサーバへの接続を確認する。
	# @return 
	# _result	結果 true=成功。false=失敗。
	# _message　メッセージ。
	##################################################################
	def CheckConnection()
		_result = false;
		_message = "";

		return _result, _message;
	end

	##################################################################
	# @summary 患者情報を取得する。
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
		return _result, _xml, _message;
	end
end