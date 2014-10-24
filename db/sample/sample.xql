xquery version "3.0";
 
<result>
{
for $staff in collection('/db/sample/')/staff
return
    $staff/name
    (:
    update insert <b/> into $staff/name
    :)
} 
</result>
