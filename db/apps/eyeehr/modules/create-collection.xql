(: GET/POST [parent-collection] = 追加対象のコレクションの親のコレクション:)
(: GET/POST [target-collection'] = 追加対象のコレクション:)
(:成功時、コレクションパスが返却される。失敗時から文字列が返却される:)

xquery version "3.0";

(:追加対象のコレクションの親のコレクション:)
let $parent-collection := request:get-parameter('parent-collection', '')
(:追加対象のコレクション:)
let $target-collection := request:get-parameter('target-collection', '')

let $result :=     xmldb:create-collection($parent-collection, $target-collection)

return 
<html>
   <div id='result'>{$result}</div> 
</html>

    
