xquery version "3.0";

let $collection := '/db/apps/eyeehr'
let $filename := request:get-uploaded-file-name('file')
 
(: make sure you use the right user permissions that has write access to this collection :)
let $login := xmldb:login($collection, 'admin', 'my-admin-password')
let $store := xmldb:store($collection, $filename, request:get-uploaded-file-data('file'))
 
return
<html>
   <div id='file'> {$filename}</div>
   <div id='collection'>{$collection}</div>
</html>