xquery version "3.0";

import module namespace admin="admin" at "./eyeehr/admin.xq";
import module namespace eyeehr-util="eyeehr-util" at "./eyeehr/eyeehr-util.xq";

(:
    @summary ファイルを指定のコレクションに保存する
	@param GET/POST [collection] = 追加対象のコレクション（末尾スラッシュなし）
	@param GET/POST [file] = ファイル(<input name="file" />)
	@return 
    	成功時、画像迄のURL(REST)が返却される。
    	失敗時、空文字列が返却される
:)

(:===ログインする。===:)
let $collection := '/db/apps/eyeehr'
let $login := admin:login($collection)

(:===GETデータを取得する。===:)
let $collection := request:get-parameter('collection', '')
let $filename := request:get-uploaded-file-name('file')
let $data := request:get-uploaded-file-data('file')
 
(:===ファイルを保存する===:)
let $ret := eyeehr-util:upload-bin-file($collection, $filename, $data)
return
<html>
   <div id='url'>{$ret}</div>
</html>
