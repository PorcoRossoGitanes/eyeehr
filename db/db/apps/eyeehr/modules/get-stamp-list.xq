xquery version "3.0";

import module namespace eyeehr-stamp="eyeehr-stamp" at "./eyeehr/eyeehr-stamp.xq";

(:
    @summary 対象のスタンプを取得する。
    @param     GET/POST [target] = 検索対象（下記参照）
		use constant 
		{
			"DISEASE" 			Disease 			=> "   " 		# 病名・所見
			"PRACTICE" 			Practice 			=> "001" 		# 診療行為
			"INJECTION" 		Practice/300		=> "001-300" 	# 注射(300番台)
			"TREATMENT" 		Practice/400		=> "001-400"  	# 処置(400番台)
			"OPERATION" 		Practice/500		=> "001-500"	# 手術(500番台)
			"MEDICAL_CHECK" 	Practice/600		=> "001-600"	# 検査(600番台)
			"MEDICAL_PRODUCT" 	Medical_Product 	=> "002" 		# 医薬品
			"MACHINE" 			Machine 			=> "003" 		# 特定機材
			"COMMENT" 			Comment 			=> "006" 		# コメント
			"PRIVATE_EXPENSE" 	Private_Expense		=> "007"		# 自費診療
		};
	@param GET/POST [target] = 対象のスタンプ(ex:DISEASE)
	@return 
    	成功時、指定のデータが返却される。
    	失敗時、スタンプが返却されない。
:)

(:===GETデータを取得する。===:)
let $target := request:get-parameter('target', '')
return eyeehr-stamp:get-stamp-list($target)
	

