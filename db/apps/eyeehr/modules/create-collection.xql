xquery version "3.0";

(: 
    @summary コレクションを保存する
	@prama GET/POST [parent-collection] = 追加対象のコレクションの親のコレクション（末尾スラッシュなし）
	@param GET/POST [target-collection] = 追加対象のコレクション（末尾スラッシュなし）
	@return 
    	成功時、コレクションパスが返却される。
    	失敗時、空文字列が返却される
:)

let $user := 'admin'
let $pswd := 'zaq12wsx'

(:追加対象のコレクションの親のコレクションを取得する:)
let $parent-collection := 
    request:get-parameter('parent-collection', '')

(:追加対象のコレクションを取得する:)
let $target-collection := 
	request:get-parameter('target-collection', '')

(:親のコレクションを分割する（再帰的にコレクションを追加するため）:)
let $collection-parts := tokenize($parent-collection, '[/]')
let $collection-parts := insert-before(
	$collection-parts, 
	count($collection-parts) + 1,
	($target-collection)
)

(:
	ルートからコレクションを作成していく。
	コレクションが既存の場合は前後で内容が変化しない事を確認した。
:)
let $cnt := fn:count($collection-parts)

for $index in (2 to $cnt - 1) (: $index = 1 の場合、$new-collection = ''（先頭部のため）:)
	let $new-collection := $collection-parts[$index + 1]
	let $current-parent-collection := string-join( $collection-parts[position() <= $index], '/')
	let $login := xmldb:login($current-parent-collection, $user, $pswd)
	let $result := xmldb:create-collection($current-parent-collection, $new-collection)
return 
	if ($index = $cnt - 1) then 
<html>
   <div id='result'>{$result}</div> 
</html>
	else 
	(
	)
