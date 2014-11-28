xquery version "3.0";

(:
    @summary ファイルを指定のコレクションに保存する
	@param GET/POST [collection] = 追加対象のコレクション（末尾スラッシュなし）
	@param GET/POST [filename] = ファイル名 例）img.jpg
	@param GET/POST [xml] = データ（SVG可）
	@return 
    	成功時、画像迄のURLが返却される。
    	失敗時、空文字列が返却される
:)

let $user := 'admin'
let $pswd := 'zaq12wsx'

(:===GETデータを取得する。===:)
let $collection := request:get-parameter('collection', '')
let $filename := request:get-parameter('filename', '')
let $data := request:get-parameter('xml', '')

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

(: ログインする。 :)
let $login := xmldb:login($collection, $user, $pswd)

(: ファイルを保存する :)
let $store := xmldb:store($collection, $filename, $data)
let $rootrest := '/exist/rest'
let $url := if($store  ne '') then ($rootrest || $collection || '/' || $filename) else ('')
 
return
<html>
   <div id='url'>{$url}</div>
   <div id='store'>{$store}</div>
</html>