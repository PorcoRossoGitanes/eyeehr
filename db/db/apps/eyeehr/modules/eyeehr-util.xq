xquery version "3.0";

module namespace eyeehr-util = "eyeehr-util";

(: 
    @summary ドキュメントの存在を確認する
    @prama $collection = コレクション
    @param $resource = リソースファイル
    @return true=存在する false=存在しない
:)
declare function eyeehr-util:exists($collection as xs:string, $resource as xs:string) 
as xs:boolean
{
	let $ret := not(empty(xmldb:last-modified($collection, $resource)))
	return $ret
};

(: 
    @summary コレクションを保存する（再帰的にコレクションを作成する。）
    @prama $parent-collection = 追加対象のコレクションの親のコレクション（末尾スラッシュなし）
	@param $target-collection = 追加対象のコレクション（末尾スラッシュなし）
	@return true=成功 false=失敗
:)
declare function eyeehr-util:create-collection($parent-collection as xs:string, $target-collection as xs:string) 
as xs:boolean
{
	let $user := 'admin'
	let $pswd := 'zaq12wsx'

	(:親のコレクションを分割する（再帰的にコレクションを追加するため）:)
	let $collection-parts := tokenize($parent-collection, '[/]')
	let $collection-parts := insert-before($collection-parts, count($collection-parts) + 1, ($target-collection))

	(: ルートからコレクションを作成していく。コレクションが既存の場合は前後で内容が変化しない事を確認した。:)
	let $cnt := fn:count($collection-parts)

	for $index in (2 to $cnt - 1) (: $index = 1 の場合、$new-collection = ''（先頭部のため）:)
		let $new-collection := $collection-parts[$index + 1]
		let $current-parent-collection := string-join( $collection-parts[position() <= $index], '/')
		let $login := xmldb:login($current-parent-collection, $user, $pswd)
		let $result := xmldb:create-collection($current-parent-collection, $new-collection)
	return ($index = $cnt - 1) 
};

(:
    @summary バイナリーファイルを指定のコレクションに保存する
	@param $collection = 追加対象のコレクション（末尾スラッシュなし）
	@param $resource = リソースファイル(<input name="file" />)
	@param $data バイナリーデーター
	@return 成功時、対象ファイルのパス、失敗時、空文字列
:)
declare function eyeehr-util:upload-bin-file($collection as xs:string, $resource as xs:string, $data as xs:base64Binary*) 
as xs:string
{

	let $user := 'admin'
	let $pswd := 'zaq12wsx'

	(:===コレクションを作成する。===:)

	(:コレクションを分割する（再帰的にコレクションを追加するため）:)
	let $collection-parts := tokenize($collection, '[/]')

	(:
		ルートからコレクションを作成していく。
		コレクションが既存の場合は前後で内容が変化しない事を確認した。
	:)
	let $cnt := fn:count($collection-parts)

	let $ret := 
		for $index in (2 to $cnt - 1) (: $index = 1 の場合、$new-collection = ''（先頭部のため）:)
			let $new-collection := $collection-parts[$index + 1]
			let $current-parent-collection := string-join( $collection-parts[position() <= $index], '/')
			let $login := xmldb:login($current-parent-collection, $user, $pswd)
			let $result := xmldb:create-collection($current-parent-collection, $new-collection)
		return 
			($index = $cnt - 1)
	 
	(:===ファイルを保存する===:)

	(: ログインする。 :)
	let $login := xmldb:login($collection, $user, $pswd)

	(: ファイルを保存する :)
	let $store := xmldb:store($collection, $filename, $data)

	let $rootrest := '/exist/rest'
	let $url := if($store  ne '') then ($rootrest || $collection || '/' || $filename) else ('')

	return
	<html>
	   <div id='url'>{$url}</div>
	</html>

};


(: 
    @summary ドキュメントを削除する
    @prama $collection = コレクション
	@param $resource = リソースファイル
	@return true=成功時 false=失敗    	
:)
declare function eyeehr-util:delete-doc($collection as xs:string, $resource as xs:string) 
as xs:boolean
{
	let $ret := not(empty(xmldb:remove($collection, $resource)))
	return $ret
};