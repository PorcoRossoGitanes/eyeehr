xquery version "3.0";

(:
    @summary 対象のスタンプを取得する。
    @param 	GET/POST [target] = 検索対象（下記参照）
		use constant 
		{
			"PRACTICE" 			Practice 			=> "001" 		# 診療行為
			"INJECTION" 		Practice/300		=> "001-300" 	# 注射(300番台)
			"TREATMENT" 		Practice/400		=> "001-400"  	# 処置(400番台)
			"OPERATION" 		Practice/500		=> "001-500"	# 手術(500番台)
			"MEDICAL_CHECK" 	Practice/600		=> "001-600"	# 検査(600番台)
			"MEDICAL_PRODUCT" 	Medical_Product 	=> "002" 		# 医薬品
			"MACHINE" 			Machine 			=> "003" 		# 特定機材
			"COMMENT" 			Comment 			=> "006" 		# コメント
			"PRIVATE_EXPENSE" 	Privete_Expense		=> "007"		# 自費診療
		};
	@param GET/POST [file] = ファイル(<input name="file" />)
	@return 
    	成功時、指定のデータが返却される。
    	失敗時、スタンプが返却されない。
:)

(:===定数定義　[target] = 検索対象===:)
let $col_stamp 				:= '/db/apps/eyeehr/data/Stamp' 	(:スタンプルートコレクション:)
let $col_practice 			:= 'Practice' 						(:診療行為:)
let $col_medical_product 	:= 'Medical_Product'				(:医薬品:)
let $col_machine 			:= 'Machine'						(:特定機材:)
let $col_comment 			:= 'Comment'						(:コメント:)
let $col_private_expense 	:= 'Privete_Expense'				(:自費:)


(:===GETデータを取得する。===:)
let $target := request:get-parameter('target', '')

(:===対象のコレクションを取得する。===:)
let $cur_collection   := ''
let $cur_collection   := 
	if ($target = 'PRACTICE' ) then ($col_stamp || '/' || $col_practice) 					(:診療行為:)
	else if ($target = 'INJECTION') then ($col_stamp || '/' || $col_practice) 				(:注射(300番台):)
	else if ($target = 'TREATMENT') then ($col_stamp || '/' || $col_practice) 				(:処置(400番台):)
	else if ($target = 'OPERATION') then ($col_stamp || '/' || $col_practice) 				(:手術(500番台):)
	else if ($target = 'MEDICAL_CHECK') then ($col_stamp || '/' || $col_practice) 			(:検査(600番台):)
	else if ($target = 'MEDICAL_PRODUCT') then ($col_stamp || '/' || $col_medical_product)	(:医薬品:)
	else if ($target = 'MACHINE') then ($col_stamp || '/' || $col_machine)					(:特定機材:)
	else if ($target = 'COMMENT') then ($col_stamp || '/' || $col_comment)					(:コメント:)
	else if ($target = 'PRIVATE_EXPENSE') then ($col_stamp || '/' || $col_private_expense)	(:自費:)
	else ''

(:===結果を取得する===:)
let $start := 
	if ($target = 'PRACTICE' )				then 	-1 	 	(:診療行為:)
	else if ($target = 'INJECTION') 		then 	300 	(:注射(300番台):)
	else if ($target = 'TREATMENT') 		then 	400		(:処置(400番台):)
	else if ($target = 'OPERATION') 		then 	500		(:手術(500番台):)
	else if ($target = 'MEDICAL_CHECK') 	then 	600 	(:検査(600番台):)
	else if ($target = 'MEDICAL_PRODUCT') 	then 	-1		(:医薬品:)
	else if ($target = 'MACHINE') 			then	-1 		(:特定機材:)
	else if ($target = 'COMMENT') 			then	-1 		(:コメント:)
	else if ($target = 'PRIVATE_EXPENSE') 	then 	-1 		(:自費:)
	else ''

let $result := 
	if ($start = -1) then 
		for $item in collection($cur_collection) /Stamp
			let $Medical_Class := $item/Orca/Medical_Class
			let $Medical_Class_Num := 
				if (fn:string($Medical_Class) = '') then -1 (:未指定:)
				else fn:number($Medical_Class)
			let $Medication_Code := $item/Orca/Medication_Code
		order by $Medical_Class_Num, $Medication_Code 
		return $item
	else if ($start >= 0) then 
		for $item in collection($cur_collection) /Stamp
			let $Medical_Class := $item/Orca/Medical_Class
			let $Medical_Class_Num := 
				if (fn:string($Medical_Class) = '') then -1 (:未指定:)
				else fn:number($Medical_Class)
			let $Medication_Code := $item/Orca/Medication_Code
		where $start <= $Medical_Class_Num and  $Medical_Class_Num < ($start + 100)
		order by $Medical_Class_Num, $Medication_Code 
		return $item
	else ''

return 
<result>
{$result}
</result>