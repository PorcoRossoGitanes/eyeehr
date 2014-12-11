xquery version "3.0";

(:
	@summary 指定の患者のカルテリストを取得する。
	@param [GET/POST] {String} $patient_id 患者ID（ex:4）
	@return {String} カルテコレクションリスト 
:)

import module namespace eyeehr-note="eyeehr-note" at "./eyeehr/eyeehr-note.xq";

let $patient_id := xs:integer(request:get-parameter('patient_id', ''))
let $doctor_id := 
	try
	{
		xs:integer(request:get-parameter('doctor_id', ''))
	} catch *
	{
		0 (:医師未指定:)
	}
return eyeehr-note:get-patient-note-list($patient_id, $doctor_id)
