xquery version "3.0";

module namespace eyeehr-util = "eyeehr-util";

declare namespace functx = "http://www.functx.com";

(: 
    @summary ドキュメントの存在を確認する
    @param $collection = コレクション
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
	let $create-collection := eyeehr-util:create-collection($collection) 
	 
	(:===ファイルを保存する===:)
	let $login := xmldb:login($collection, $user, $pswd)
	let $store := xmldb:store($collection, $filename, $data)

	let $rootrest := '/exist/rest'
	let $url := if($store  ne '') then ($rootrest || $collection || '/' || $filename) else ('')

	return $url
};

(:
    @summary ファイルを指定のコレクションに保存する
	@param GET/POST [collection] = 追加対象のコレクション（末尾スラッシュなし）
	@param GET/POST [filename] = ファイル名 例）img.jpg
	@param GET/POST [xml] = データ（SVG可）
	@return 
    	成功時、画像迄のURLが返却される。
    	失敗時、空文字列が返却される
:)
declare function eyeehr-util:upload-xml-file($collection as xs:string, $resource as xs:string, $data as xs:string)
as xs:string
{
	let $user := 'admin'
	let $pswd := 'zaq12wsx'

	(:===コレクションを作成する===:)
	let $create-collection := eyeehr-util:create-collection($collection) 

	(:===ファイルを保存する===:)
	let $login := xmldb:login($collection, $user, $pswd)
	let $store := xmldb:store($collection, $filename, $data)

	let $rootrest := '/exist/rest'
	let $url := if($store  ne '') then ($rootrest || $collection || '/' || $filename) else ('')
	 
	return $url
};

(: 
    @summary コレクションを保存する（再帰的にコレクションを作成する。）
    @param $collection = 追加対象のコレクション
	@return true=成功 false=失敗
:)
declare function eyeehr-util:create-collection($collection as xs:string) 
as xs:boolean
{
	let $user := 'admin'
	let $pswd := 'zaq12wsx'

	(:親のコレクションを分割する（再帰的にコレクションを追加するため）:)
	let $collection-parts := tokenize($collection, '[/]')

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
    @summary ドキュメントを削除する
    @param $collection = コレクション（ex:/db/apps/sample/）
	@param $resource = リソースファイル（ex:sample.xml）
	@return true=成功時 false=失敗    	
:)
(:
declare function eyeehr-util:delete-node($collection as xs:string, $resource as xs:string, ) 
as xs:boolean
{
	let $ret := not(empty(xmldb:remove($collection, $resource)))
	return $ret
};
:)

(: 
    @summary ドキュメントを削除する
    @param $collection = コレクション （ex:/db/apps/sample/）
	@param $resource = リソースファイル （ex:sample.xml）
	@return true=成功時 false=失敗    	
:)
declare function eyeehr-util:delete-doc($collection as xs:string, $resource as xs:string) 
as xs:boolean
{
	let $ret := not(empty(xmldb:remove($collection, $resource)))
	return $ret
};

(: 
    @summary 末数を取得する
    @param $number = 番号 （ex:1）
	@param $unit = 単位（ex:10000）
	@return 末数（ex:9999）  	
:)
declare function eyeehr-util:get-to($number, $unit)
{
	let $ret := xs:string($unit * (xs:integer($number div $unit) + 1) - 1)
	return $ret
};