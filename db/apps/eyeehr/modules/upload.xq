xquery version "3.0";

let $collection := request:get-parameter('collection', '')
let $filename := request:get-uploaded-file-name('file')
let $rootrest := '/exist/rest'
let $url := $rootrest || $collection || '/' || $filename
 
(: make sure you use the right user permissions that has write access to this collection :)
let $login := xmldb:login($collection, 'admin', 'zaq12wsx')
let $store := xmldb:store($collection, $filename, request:get-uploaded-file-data('file'))
 
return
<html>
   <div id='url'>{$url}</div>
   <div id='file'> {$filename}</div>
   <div id='collection'>{$collection}</div>
</html>