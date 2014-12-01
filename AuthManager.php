<?php
/**
 * 認証マネージャ
 */
class AuthManager
{
    /**
     * ログイン処理
     * @param  [integer] $i_user
     * @param  [string] $i_password
     * @return [array] 認証結果（true=成功、false=失敗）、メッセージ
     */
    public function login($i_user, $i_password) {

      $result = true; $message = "認証に成功しました。";

      // XMLファイルを指定する。
      // 例）$uri = "sample.xml";//"http://192.168.33.10:8080/exist/rest/apps/eyeehr/data/staff/staff-1.xml";
      $uri = "http://" .$_SERVER["SERVER_NAME"] /*. ":8080"*/   // ドメイン・ポート
      . "/exist/rest/apps/eyeehr/" // プロジェクトルート
      . "data/staff/"             // データパス
      . "staff-" . $i_user . ".xml";//ファイルを指定

      $xmlData = simplexml_load_file($uri);//xmlを読み込む

      if ($i_user == $xmlData['id'] && $i_password == $xmlData->pswd) 
      {
        // 認証成功時、セッションIDを新規に発行する。
        session_regenerate_id(TRUE);
        $_SESSION["USERID"] = $i_user;
      }
      else 
      {
        // 認証失敗時、失敗を返す。
        $result = false; $message = "ユーザID、または、パスワードに誤りがあります。";
      }

      return array($result, $message);
    }
}
?>