xquery version "3.0";

import module namespace eyeehr-note="eyeehr-note" at "./eyeehr/eyeehr-note.xq";

(:
	@summary 指定の患者・日時のカルテを取得する。
	@param [GET/POST] {String} $patient_id 患者ID（ex:4）
	@param [GET/POST] {String} $date 作成日（yyyyMMdd）（ex:'20141209'）
	@param [GET/POST] {String} $time 作成時刻（hhmmss）（ex:'134107'）
	@return カルテデーター <Note PatientId="4" Date="20141209" Time="134107">...</Note>
:)
let $patient_id := request:get-parameter('patient_id', '')(:4:)
let $date := request:get-parameter('date', '')(:'20141209':)
let $time := request:get-parameter('time', '')(:'134107':)

return eyeehr-note:get-note($patient_id, $date, $time)
