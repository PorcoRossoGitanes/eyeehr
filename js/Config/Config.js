/**
 * システム設定
 * @class Config
 * @constructor
 */
function Config() {}

/**
 * システム設定を読み込む。
 * @static
 * @method Load
 * @return {Object} システム設定(JSONオブジェクト)
 */
Config.Load = function() {
    const URL = 'js/json/configure.json';
    var ret = Utility.LoadJson(URL);
    return ret;
}
