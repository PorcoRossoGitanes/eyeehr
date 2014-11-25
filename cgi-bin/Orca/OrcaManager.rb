#!/usr/bin/ruby

require 'uri'
require 'net/http'
require 'yaml'
require 'pp'

Net::HTTP.version_1_1

######################################################################
# @summary ORCA接続マネージャー
# @dependency uri, net/http, yaml, pp
# @dependency ./settings.yaml
######################################################################
class OrcaManager #< Super

	# 設定ファイルのファイルパス（固定）
	FILE_PATH = "./settings.yaml";
	# @const class :01 中途データ登録
	MEDICALMODV2_CLASS_ADD = "01";
	# @const class :02 中途データ削除
	MEDICALMODV2_CLASS_DEL = "02";
	# @const class :03 中途データ変更
	MEDICALMODV2_CLASS_MOD = "03";
	# コンテントタイプ
	MEDICALMODV2_CONTENT_TYPE = "application/xml";

	##################################################################
	# 初期化
	##################################################################
	def initialize()
		# 設定ファイルを読み込む。
		_settings = YAML.load_file(FILE_PATH); #pp(_settings);            
		# @param ホスト名
		@host = _settings["HOST"]; #192.168.24.100;
		# @param ポート（固定8000）
		@port = _settings["PORT"]; #8000;
		# @param ユーザー
		@user = _settings["USER"]; #ormaster;
		# @param パスワード
		@pswd = _settings["PSWD"]; #ormaster123;
	end

	##################################################################
	# @summary ORCAサーバへの接続を確認する。
	# @return 
	# _result	結果 true=成功。false=失敗。
	# _message　メッセージ。
	##################################################################
	def CheckConnection()
		_result = true;
		_message = "";

		# TODO : 接続を確認する。(ping host)
		# TODO : 接続を確認する。(telnet host port)

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

		# 接続を確立できるか確認する。
		if(_result) then 
			_result, _message = self.CheckConnection();
		end
			
		# 指定の患者IDの患者情報を取得する。
		if (_result) then
			begin
				# リクエストを設定する。
				_req = Net::HTTP::Get.new("/api01rv2/patientgetv2?id=#{i_patient_id}");

				# ORCAサーバーへBASIC認証情報を設定する。
				_req.basic_auth(@user, @pswd);

				Net::HTTP.start(@host, @port) { |_http|
				  _res = _http.request(_req);
				  _xml = _res.body;
				}
			rescue => ex
				# 情報取得の失敗を検出する。
				_result = false; 
				_message = "患者情報を取得する事が出来ませんでした。(" + ex.message + ")" ;
				break;
			end;
		end	

		# 処理結果、XML、メッセー時を返却する。
		return _result, _xml, _message;
	end

	##################################################################
	# @summary 医療行為中途データーを登録する。
	# @param i_class クラス（01 中途データ登録、02 中途データ削除、03 中途データ変更）
	# @param i_xml 医療行為中途データー（XML）
	# @return 
	# _result	結果 true=成功。false=失敗。
	# _xml 		成功時、XML（レスポンス）。失敗時、空文字列。
	# _message　メッセージ。
	# @dependency uri, net/http
	##################################################################
	def ModifyMedicalInfo(i_class, i_xml)
		_result = true;
		_message = "";



		_req = Net::HTTP::Post.new("/api21/medicalmodv2?class={i_class}");
		_data = i_xml;


		_req.content_length = _data.size;
		_req.content_type = MEDICALMODV2_CONTENT_TYPE;
		_req.body = _datal

		_req.basic_auth(@user, @pswd);
		#puts _req.body

		Net::HTTP.start(HOST, PORT) {|http|
		 	_res = http._request(_req)
			puts _res.body
		}
	end
end