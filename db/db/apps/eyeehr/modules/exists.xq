xquery version "3.0";

(: 
    @summary ドキュメントの存在を確認する
    @prama GET/POST [collection] = コレクション
    @param GET/POST [file] = ファイル
	@return 
    	成功時、true
    	失敗時、false
:)

	let $ret := not(empty(xmldb:last-modified('/db/apps/eyeehr/img/', 'fa_othvasccond_Sickle_Cell_Retinopathy_.jpg')))
	return $ret



