xquery version "3.0";

(:
    @summary ファイルを指定のコレクションに保存する
    @prama GET/POST [type] = 	bin = file inputからなどバイナリデーターで保存する
								xml = XMLデーターを保存する
	@param GET/POST [collection] = 追加対象のコレクション（末尾スラッシュなし）
	@param GET/POST [filename] = ファイル名
	@return 
    	成功時、画像迄のURLが返却される。
    	失敗時、空文字列が返却される
:)

let $rootrest := '/exist/rest'

let $type  := request:get-parameter('type', '')
let $collection := request:get-parameter('collection', '')
let $filename := 
	if ($type = 'bin') then (request:get-uploaded-file-name('file')) 
	else (request:get-parameter('filename', ''))

let $data := request:get-uploaded-file-data('file')

(: ログインする。 :)
let $login := xmldb:login($collection, 'admin', 'zaq12wsx')

(: ファイルを保存する :)
let $store := xmldb:store($collection, $filename, $data)
let $url := if($store  ne '') then ($rootrest || $collection || '/' || $filename) else ('')
 


return
<html>
   <div id='url'>{$url}</div>
   <div id='collection'>{$collection}</div>
   <div id='file'> {$filename}</div>
   <div id='data'>{$data}</div>
</html>
