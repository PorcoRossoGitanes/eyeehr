xquery version "3.0";

module namespace admin = "admin";

(: 
    @summary 管理者権限でログインする。
    @param {String} $collection = コレクション
    @return true=成功 false=失敗
:)
declare function admin:login($collection as xs:string)
as xs:boolean
{
	let $config-path := '../config/config.xml'
	let $admin := doc($config-path)/Config/Admin
	let $admin-id := $admin/Id/text()
	let $admin-password := $admin/Password/text()

	return 
		xmldb:login($collection, $admin-id, $admin-password)
};