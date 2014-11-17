(: 日本語を含む文字列を検索する :)
xquery version "3.0";

let $collection := '/db/apps/eyeehr/data/Stamp/Practice/'
let $path := '/Stamp/Orca'

for $item in collection($collection)
let $name := $item/Stamp/Orca/Medication_Name
where fn:contains($name, '瞳孔')
return <result>{$name}</result>
