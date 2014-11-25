#!/usr/bin/ruby

require "cgi"               # CGIモジュールを追加する。
require 'OrcaManager.rb'    # ORCA接続マネージャを追加する。

######################################################################
# メイン処理：指定の患者番号の患者情報を取得する。
# [POST]    xml:診療行為中途データー
# [参照]    http://www.orca.med.or.jp/receipt/tec/api/medicalmod.html
# @return   <result>
#               <result>送信結果（true/false)</result>
#               <request>リクエスト内容（XML）</request>
#               <response>レスポンス内容（XML）</response>
#               <message>メッセージ</message>
#           </result>
# @dependency cgi
######################################################################

# POST値から
# （１）xml:診療行為中途データー
#を取得する。
_cgi = CGI.new();
_xml = _cgi['xml'];

# _xml = <<EOF
# <data>
#         <medicalreq type="record">
#                 <InOut type="string"></InOut>
#                 <Patient_ID type="string">3</Patient_ID>
#                 <Perform_Date type="string">2014-11-07</Perform_Date>
#                 <Perform_Time type="string">15:34:12</Perform_Time>
#                 <Medical_Uid type="string">76a64612-667a-11e4-9027-000c290d62da</Medical_Uid>
# <!-- ========================================================== -->
# <!--                    診療データ                              -->
# <!-- ========================================================== -->
#                 <Diagnosis_Information type="record">
#                         <Department_Code type="string">01</Department_Code>
#                         <Physician_Code type="string">00001</Physician_Code>
#                         <HealthInsurance_Information type="record">
#                                 <InsuranceProvider_Class type="string">060</InsuranceProvider_Class>
#                                 <InsuranceProvider_Number type="string">320010</InsuranceProvider_Number>
#                                 <InsuranceProvider_WholeName type="string">国保</InsuranceProvider_WholeName>
#                                 <HealthInsuredPerson_Symbol type="string">併用</HealthInsuredPerson_Symbol>
#                                 <HealthInsuredPerson_Number type="string">２</HealthInsuredPerson_Number>
#                                 <HealthInsuredPerson_Continuation type="string"></HealthInsuredPerson_Continuation>
#                                 <HealthInsuredPerson_Assistance type="string">3</HealthInsuredPerson_Assistance>
#                                 <RelationToInsuredPerson type="string">2</RelationToInsuredPerson>
#                                 <HealthInsuredPerson_WholeName type="string">日医　太郎</HealthInsuredPerson_WholeName>
#                                 <Certificate_StartDate type="string">2004-04-01</Certificate_StartDate>
#                                 <Certificate_ExpiredDate type="string">9999-12-31</Certificate_ExpiredDate>
#                                 <PublicInsurance_Information type="array">
#                                         <PublicInsurance_Information_child type="record">
#                                                 <PublicInsurance_Class type="string">91</PublicInsurance_Class>
#                                                 <PublicInsurance_Name type="string">原爆一般</PublicInsurance_Name>
#                                                 <PublicInsurer_Number type="string">91320010</PublicInsurer_Number>
#                                                 <PublicInsuredPerson_Number type="string">9702390</PublicInsuredPerson_Number>
#                                                 <Certificate_IssuedDate type="string">2008-10-10</Certificate_IssuedDate>
#                                                 <Certificate_ExpiredDate type="string">2010-10-10</Certificate_ExpiredDate>
#                                         </PublicInsurance_Information_child>
#                                         <PublicInsurance_Information_child type="record">
#                                                 <PublicInsurance_Class type="string">10</PublicInsurance_Class>
#                                                 <PublicInsurance_Name type="string"></PublicInsurance_Name>
#                                                 <PublicInsurer_Number type="string"></PublicInsurer_Number>
#                                                 <PublicInsuredPerson_Number type="string"></PublicInsuredPerson_Number>
#                                                 <Certificate_IssuedDate type="string">2008-10-10</Certificate_IssuedDate>
#                                                 <Certificate_ExpiredDate type="string">2010-10-10</Certificate_ExpiredDate>
#                                         </PublicInsurance_Information_child>
#                                 </PublicInsurance_Information>
#                         </HealthInsurance_Information>
#                         <Medical_Information type="array">
#                                 <Medical_Information_child type="record">
#                                         <Medical_Class type="string">120</Medical_Class>
#                                         <Medical_Class_Name type="string">再診</Medical_Class_Name>
#                                         <Medical_Class_Number type="string">1</Medical_Class_Number>
#                                         <Medication_info type="array">
#                                                 <Medication_info_child type="record">
#                                                         <Medication_Code type="string">112007410</Medication_Code>
#                                                         <Medication_Name type="string">再診</Medication_Name>
#                                                         <Medication_Number type="string">1</Medication_Number>
#                                                         <Medication_Generic_Flg type="string"></Medication_Generic_Flg>
#                                                 </Medication_info_child>
#                                         </Medication_info>
#                                 </Medical_Information_child>
#                                 <Medical_Information_child type="record">
#                                         <Medical_Class type="string">210</Medical_Class>
#                                         <Medical_Class_Name type="string">内服薬剤</Medical_Class_Name>
#                                         <Medical_Class_Number type="string">1</Medical_Class_Number>
#                                         <Medication_info type="array">
#                                                 <Medication_info_child type="record">
#                                                         <Medication_Code type="string">620001402</Medication_Code>
#                                                         <Medication_Name type="string">グリセリン</Medication_Name>
#                                                         <Medication_Number type="string">2</Medication_Number>
#                                                         <Medication_Generic_Flg type="string">yes</Medication_Generic_Flg>
#                                                 </Medication_info_child>
#                                         </Medication_info>
#                                 </Medical_Information_child>
#                                 <Medical_Information_child type="record">
#                                         <Medical_Class type="string">500</Medical_Class>
#                                         <Medical_Class_Name type="string">手術</Medical_Class_Name>
#                                         <Medical_Class_Number type="string">1</Medical_Class_Number>
#                                         <Medication_info type="array">
#                                                 <Medication_info_child type="record">
#                                                         <Medication_Code type="string">150003110</Medication_Code>
#                                                         <Medication_Name type="string">皮膚、皮下腫瘍摘出術（露出部）（長径２ｃｍ未満）</Medication_Name>
#                                                         <Medication_Number type="string">1</Medication_Number>
#                                                         <Medication_Generic_Flg type="string"></Medication_Generic_Flg>
#                                                 </Medication_info_child>
#                                                 <Medication_info_child type="record">
#                                                         <Medication_Code type="string">641210099</Medication_Code>
#                                                         <Medication_Name type="string">キシロカイン注射液１％</Medication_Name>
#                                                         <Medication_Number type="string">3</Medication_Number>
#                                                         <Medication_Generic_Flg type="string"></Medication_Generic_Flg>
#                                                 </Medication_info_child>
#                                                 <Medication_info_child type="record">
#                                                         <Medication_Code type="string">840000042</Medication_Code>
#                                                         <Medication_Name type="string">手術○日</Medication_Name>
#                                                         <Medication_Number type="string">15</Medication_Number>
#                                                         <Medication_Generic_Flg type="string"></Medication_Generic_Flg>
#                                                 </Medication_info_child>
#                                         </Medication_info>
#                                 </Medical_Information_child>
#                         </Medical_Information>
#                         <Disease_Information type="array">
#                                 <Disease_Information_child type="record">
#                                         <Disease_Code type="string">8830052</Disease_Code>
#                                         <Disease_Name type="string">ＡＣバイパス術後機械的合併症</Disease_Name>
#                                         <Disease_SuspectedFlag type="string">S</Disease_SuspectedFlag>
#                                         <Disease_StartDate type="string">2010-11-23</Disease_StartDate>
#                                         <Disease_EndDate type="string">2010-11-24</Disease_EndDate>
#                                         <Disease_OutCome type="string">D</Disease_OutCome>
#                                 </Disease_Information_child>
#                                 <Disease_Information_child type="record">
#                                         <Disease_InOut type="string">O</Disease_InOut>
#                                         <Disease_Single type="array">
#                                                 <Disease_Single_child type="record">
#                                                         <Disease_Single_Code type="string">8830417</Disease_Single_Code>
#                                                         <Disease_Single_Name type="string">胃炎</Disease_Single_Name>
#                                                 </Disease_Single_child>
#                                                 <Disease_Single_child type="record">
#                                                         <Disease_Single_Code type="string">ZZZ8002</Disease_Single_Code>
#                                                         <Disease_Single_Name type="string">の疑い</Disease_Single_Name>
#                                                 </Disease_Single_child>
#                                         </Disease_Single>
#                                         <Disease_StartDate type="string">2010-07-06</Disease_StartDate>
#                                         <Disease_EndDate type="string">2010-07-28</Disease_EndDate>
#                                         <Disease_OutCome type="string">D</Disease_OutCome>
#                                 </Disease_Information_child>
#                         </Disease_Information>
#                 </Diagnosis_Information>
#         </medicalreq>
# </data>
# EOF

# ORCAに接続し、ORCAの患者情報を取得する。
_om = OrcaManager.new();
_result, _req, _res, _message = _om.ModifyMedicalInfo(OrcaManager::MEDICALMODV2_CLASS_MOD, _xml);

# CGIの実行結果を出力する。
print("Content-type: text/html\n\n");

print("<result>\n");
print("<result>", _result, "</result>\n");
print("<request>", _req, "</request>\n");
print("<response>", _res, "</response>\n");
print("<message>", _message, "</message>\n");
print("</result>\n");

