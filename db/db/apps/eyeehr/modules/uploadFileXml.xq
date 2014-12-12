xquery version "3.0";

import module namespace eyeehr-util="eyeehr-util" at "./eyeehr/eyeehr-util.xq";

(:
    @summary ファイルを指定のコレクションに保存する
	@param GET/POST [collection] = 追加対象のコレクション（末尾スラッシュなし）
	@param GET/POST [filename] = ファイル名 例）img.jpg
	@param GET/POST [xml] = データ（SVG可）
	@return 
    	成功時、画像迄のURLが返却される。
    	失敗時、空文字列が返却される
:)

(:===GETデータを取得する。===:)
let $collection := request:get-parameter('collection', '')
let $filename := request:get-parameter('filename', '')
let $data := request:get-parameter('xml', '')

(:=== ファイルを保存する ===:)
return
<html>
   <div id='url'>{eyeehr-util:upload-xml-file($collection, $filename, $data)}</div>
</html>
