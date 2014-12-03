/**
 * システム設定
 * @class Config
 * @constructor
 */
function Config() {}

Config.Load = function() {
    const URL = 'js/json/configure.json';
    var ret = Utility.LoadJson(URL);
    return ret;
}
