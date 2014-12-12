xquery version "3.0";

module namespace eyeehr-note = "eyeehr-note";

import module namespace admin="admin" at "./admin.xq";
import module namespace eyeehr-util="eyeehr-util" at "./eyeehr-util.xq";

(:
    @summary 指定の患者・日時のカルテを取得する。
	@param $patient_id {Number} $patient_id 患者ID
	@param $yyyyMMdd {String} $date 作成日（yyyyMMdd）
	@param $hhmmss {String} $time 作成時刻（hhmmss）
	@return 成功時、カルテデーター<Note/>失敗時、エラー<Error/>
	@example eyeehr-note:get-note('4', '20141209', '134107')
:)
declare function eyeehr-note:get-note($patient_id as xs:integer, $date as xs:string, $time as xs:string)
as node()*
{
	let $collection := '/db/apps/eyeehr/data/Note/' || 
		eyeehr-note:get-patient-to($patient_id) || '/' || 
		'Patient-' || xs:string($patient_id) || '/' || $date || '/' ||  $time

	let $login := admin:login($collection)

	let $data := if($login) then collection($collection)
		else ()

	let $ret := 
		if (empty($data)) then <Error Message="データーが存在しません。"/>
		else <Note>{$data}</Note>

	return $ret
};

(:
	@summary 患者の全カルテを取得する。
	@param $patient_id {Number} $patient_id 患者ID
	@return 患者のカルテ一覧
	@example eyeehr-note:get-patient-notes(1) 
:)
declare function eyeehr-note:get-patient-notes($patient_id as xs:integer) 
as node()*
{
	<Notes>
	{
		let $notes := eyeehr-note:get-patient-note-list($patient_id, 0)
		for $note in $notes/Note
			let $collection := $note/text()
			return <Note>{collection($collection)}</Note>		
	}
	</Notes>
};

(: 
    @summary 指定の患者のカルテ一覧（降順、新しいものを先頭）を取得する
	@param $patient_id {Number} $patient_id 患者ID
	@param $doctor_id {Number} 医師番号 未指定:0以下
	@return コレクション一覧 <Notes />（ex:/db/apps/eyeehr/data/Note/Patient-to-9999/Patient-1/yyyyMMdd/hhmmss）
	@example eyeehr-note:get-patient-note-list('1')
	TODO : 作成途中（医師絞り込み）
:)
declare function eyeehr-note:get-patient-note-list($patinet_id as xs:integer, $doctor_id as xs:integer) 
as node()*
{
	let $notes := 
		try {
			(:患者のコレクションパスを取得する。:)
			let $patient_collection := '/db/apps/eyeehr/data/Note/' ||  eyeehr-note:get-patient-to($patinet_id) || '/Patient-' || $patinet_id || '/'
			let $login := admin:login($patient_collection)
			let $note-list := 
				if ($login) then 
					for $date in xmldb:get-child-collections($patient_collection)
						for $time in xmldb:get-child-collections($patient_collection || $date)
							(:患者のカルテのコレクションパスを取得する。:)
							let $collection := $patient_collection || $date || '/' ||  $time
							return <Note>{$collection}</Note>
				else 
					''
			return <Notes>{$note-list}</Notes>
		} catch * {
			<Notes />
		}
	return 
		<Notes>
		{
			for $note in $notes/Note
			order by $note descending
			return $note
		}
		</Notes>
};

(: 
    @summary 患者番号から患者分類コレクションを取得する。
    @param {Number} $patient_id 患者番号（ex:1/）
	@return 患者分類コレクション（ex:Patient-to-9999）
:)
declare function eyeehr-note:get-patient-to($patient_id as xs:integer) 
as xs:string
{
	let $ret := 'Patient-to-' || eyeehr-util:get-to($patient_id, 10000)
	return $ret
};