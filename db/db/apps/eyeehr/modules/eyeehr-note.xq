xquery version "3.0";

module namespace eyeehr-note = "eyeehr-note";
import module namespace eyeehr-util="eyeehr-util" at "./eyeehr-util.xq";


(: 
    @summary 指定の患者のカルテ一覧を取得する
    @param $collection = コレクション（ex:/db/apps/eyeehr/data/Note/patient-to-9999/patient-1/）
	@return コレクション一覧（ex:/db/apps/eyeehr/data/Note/patient-to-9999/patient-1/yyyyMMdd/hhmmss）
:)
declare function eyeehr-note:get-note-list($patinet_id as xs:integer) 
as xs:string*
{
	let $patient := eyeehr-note:get-patient-to($patinet_id)
	let $collection := '/db/apps/eyeehr/data/Note/' ||  eyeehr-note:get-patient-to($patinet_id) || '/patient-' || $patinet_id || '/'
	for $date in xmldb:get-child-collections($collection)
		for $time in xmldb:get-child-collections($collection || $date)
		return $collection || $date || '/' ||  $time
};

(: 
    @summary 患者番号から患者分類コレクションを取得する。
    @param $patinet_id  = 患者番号（ex:1/）
	@return 患者分類コレクション（ex:patient-to-9999）
:)
declare function eyeehr-note:get-patient-to($patinet_id as xs:integer) 
as xs:string
{
	let $ret := 'patient-to-' || eyeehr-util:get-to($patinet_id, 10000)
	return $ret
};