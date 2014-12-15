xquery version "3.0";

module namespace eyeehr-patient= "eyeehr-patient";

import module namespace admin="admin" at "./admin.xq";
import module namespace eyeehr-util="eyeehr-util" at "./eyeehr-util.xq";

(:
    @summary 指定の患者・日時のカルテを取得する。
	@param $patient_id {Number} $patient_id 患者ID
	@return 成功時、患者情報<Patient/> 失敗時、エラー<Error/>
	@example eyeehr-note:get-info(4)
:)
declare function eyeehr-patient:get-patient-info($patient_id as xs:integer)
as node()*
{
	let $collection := '/db/apps/eyeehr/data/Patient/' || 
		eyeehr-patient:get-patient-to($patient_id) || '/' || 
		'Patient-' || xs:string($patient_id) || '/' 

	let $login := admin:login($collection)

	let $data := if($login) then collection($collection)
		else ()

	let $ret := 
		if (empty($data)) then <Error Message="データーが存在しません。"/>
		else <Patient>{$data}</Patient>

	return $ret
};

(: 
    @summary 患者番号から患者分類コレクションを取得する。
    @param {Number} $patient_id 患者番号（ex:1/）
	@return 患者分類コレクション（ex:Patient-to-9999）
:)
declare function eyeehr-patient:get-patient-to($patient_id as xs:integer) 
as xs:string
{
	let $ret := 'Patient-to-' || eyeehr-util:get-to($patient_id, 10000)
	return $ret
};