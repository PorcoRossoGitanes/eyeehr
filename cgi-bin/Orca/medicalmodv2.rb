#!/usr/bin/ruby

=begin rdoc
@summary	メイン処理：指定の患者番号の患者情報を取得する。
* @param 		[POST] xml:診療行為中途データー
* @return   	
成功時：ORCAレスポンスデータ
失敗時：
  <eyeehr>
  <result>送信結果（true/false)</result>
  <request>リクエスト内容（XML）</request>
  <message>メッセージ</message>
  </eyeehr>
* @dependency cgi, logger, OrcaManager.rb
* [参照]    		http://www.orca.med.or.jp/receipt/tec/api/medicalmod.html
=end

#require 'logger'           # CGI実行時に500エラーとなる。
require 'cgi'               # CGIモジュールを追加する。
require 'OrcaManager.rb'    # ORCA接続マネージャを追加する。

# ログファイルを用意する。
#log = Logger.new("result.log")

# POST値から
# （１）xml:診療行為中途データー
#を取得する。
_cgi = CGI.new();
_xml = _cgi['xml'];

# ORCAに接続し、ORCAの患者情報を取得する。
_om = OrcaManager.new();
_result, _req, _res, _message = _om.ModifyMedicalInfo("03", _xml);

# CGIの実行結果を出力する。
print("Content-type: text/html\n\n");

if (_result) then
    print(_res);
else
    print("<eyeehr>\n");
    print("<result>", _result, "</result>\n");
    print("<request>", _req, "</request>\n");
    #print("<response>", _res, "</response>\n");
    print("<message>", _message, "</message>\n");
    print("</eyeehr>\n");
end;

# ログを出力する。
#log.info(_result);
#log.info(_req);
#log.info(_res);
#log.info(_message);

