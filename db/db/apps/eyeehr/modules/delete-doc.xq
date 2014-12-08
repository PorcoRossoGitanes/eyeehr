xquery version "3.0";

(: 
    @summary ドキュメントを削除する
    @prama GET/POST [collection] = コレクション
	@param GET/POST [file] = ファイル
	@return 
    	成功時、<success>
    	失敗時、<error>
:)

(:===GETデータを取得する。===:)
let $collection := request:get-parameter('collection', '')
let $resource := request:get-parameter('file', '')

(:ドキュメントを削除する:)
return 
try {
	<success>
		{xmldb:remove($collection, $resource)}
    	<collection>{$collection}</collection>
    	<resource>{$resource}</resource>
	</success>
} catch * {
    <error>
    	<code>{$err:code}</code>
    	<description>{$err:description}</description>
    	<collection>{$collection}</collection>
    	<resource>{$resource}</resource>
    </error>
}
