/**
 * システム設定
 * @class Utility
 * @remarks 使用するHTMLに下記が必要な点を留意する。
 * @constructor
 */
function Config() {}

Config.Load = function() {
    const URL = 'js/json/configure.json';
    var ret = Utility.LoadJson(URL);
    return ret;
}
