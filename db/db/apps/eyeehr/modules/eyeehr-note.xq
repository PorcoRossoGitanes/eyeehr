xquery version "3.0";

module namespace eyeehr-note = "eyeehr-note";
import module namespace eyeehr-util="eyeehr-util" at "./eyeehr-util.xq";

(:
	@summary 指定の患者・日時のカルテを取得する。
	@param $patient_id {String} $patient_id 患者ID
	@param $yyyyMMdd {String} $date 作成日（yyyyMMdd）
	@param $hhmmss {String} $time 作成時刻（hhmmss）
	@return 成功時、カルテデーター<Note/>失敗時、エラー<Error/>
	@example eyeehr-note:get-note('4', '20141209', '134107')
:)
declare function eyeehr-note:get-note($patient_id as xs:integer, $date as xs:string, $time as xs:string)
as node()*
{
	let $collection := '/db/apps/eyeehr/data/Note/' || eyeehr-note:get-Patient-to($patient_id) || '/' || 
		'Patient-' || xs:string($patient_id) || '/' || $date || '/' ||  $time
	let $data := collection($collection)
	return 
	if (empty($data)) then <Error Message="データーが存在しません。"/>
	else <Note PatientId="{$patient_id}" Date="{$date}" Time="{$time}">{$data}</Note>
};

(: 
    @summary 指定の患者のカルテ一覧を取得する
    @param $collection = コレクション（ex:/db/apps/eyeehr/data/Note/Patient-to-9999/Patient-1/）
	@return コレクション一覧（ex:/db/apps/eyeehr/data/Note/Patient-to-9999/Patient-1/yyyyMMdd/hhmmss）
	@example eyeehr-note:get-note-list('1')
:)
declare function eyeehr-note:get-note-list($patinet_id as xs:integer) 
as node()*
{
	let $collection := '/db/apps/eyeehr/data/Note/' ||  eyeehr-note:get-Patient-to($patinet_id) || '/Patient-' || $patinet_id || '/'
	let $note-list := 
		for $date in xmldb:get-child-collections($collection)
			for $time in xmldb:get-child-collections($collection || $date)
				return <Note>{$collection || $date || '/' ||  $time}</Note>
	return <Notes>{$note-list}</Notes>
};

(: 
    @summary 患者番号から患者分類コレクションを取得する。
    @param $patinet_id  = 患者番号（ex:1/）
	@return 患者分類コレクション（ex:Patient-to-9999）
:)
declare function eyeehr-note:get-Patient-to($patinet_id as xs:integer) 
as xs:string
{
	let $ret := 'Patient-to-' || eyeehr-util:get-to($patinet_id, 10000)
	return $ret
};