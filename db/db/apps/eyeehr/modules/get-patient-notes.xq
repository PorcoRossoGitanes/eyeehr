xquery version "3.0";

import module namespace eyeehr-note="eyeehr-note" at "./eyeehr/eyeehr-note.xq";

(:
	@summary 指定の患者の全カルテを取得する。
	@param [GET/POST] {String} $patient_id 患者ID（ex:4）
	@return カルテリストデーター 
	<Notes>
		<Note PatientId="4" Date="20141209" Time="134107">...</Note>
		:
	</Notes>
:)
let $patient_id := request:get-parameter('patient_id', '')

return eyeehr-note:get-patient-notes($patient_id)
