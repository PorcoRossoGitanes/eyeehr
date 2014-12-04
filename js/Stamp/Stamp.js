/**
 * スタンプクラス
 * @class Stamp
 * @constructor
 */
function Stamp() {

    /**
     * @property {String} ClassName クラス名
     * @static
     */
    arguments.callee.ClassName = 'Stamp';

    /**
     * @property {String} To 貼付先
     * @static
     */
    arguments.callee.To =  'NoteItemContainer';

    /**
     * @property {String} _id ID(ファイル名　拡張子なし)
     */
    this._id = '';

    /**
     *@property {String} _title スタンプタイトル（正式）
     */
    this._title = 'N/A';

    /**
     * @property {String} _short_titleスタンプタイトル（略称・表示名）
     */
    this._short_title = this._title;

    /**
     * @property {String} _url [保存先]URL
     */
    this._url = '';

    /**
     * @property {String} _xml XML文字列
     */
    this._xml = '';

    /**
     * @property {Object} _jquery JQuery オブジェクト
     */
    this._jquery = $(
        '<button ' +
        'type="button" ' +
        'class="btn btn-default btn-xs"' +
        ' ></button>'
    )[0];
};
(function() {

    /**
     * @param {Object} プロトタイプ
     */
    var _proto = Stamp.prototype;

    /**
     * @param {Number} スタンプタイトル（略称・表示名）の最大長
     */
    const SHORT_TITLE_MAX_LENGTH = 5;


    /**
     * クラス名を取得する。
     * @method getName
     * @return {String} クラス名
     */
    _proto.getName = function() {
        return ClassName;
    };

    /** 
     * XMLを設定する。
     * @method setByXml
     * @param {String/Object} i_xml XML文字列
     */
    _proto.setByXml = function(i_xml) {
        if (i_xml !== undefined) {
            this._xml = i_xml;
            //console.log(this._xml);

            this._id = $(i_xml).attr('Id');
            this._url = $(i_xml).attr('Url');

            // 正式名称を取得する。
            this._title = $(i_xml).children('Eyeehr').children('Title').text();

            // 略称（表示名）を取得する。
            this._short_title =
                (this._title.length >= SHORT_TITLE_MAX_LENGTH) ?
                this._title.slice(0, SHORT_TITLE_MAX_LENGTH - 1) + '...' : this._title;

            $(this._jquery).attr('id', this._id);
            $(this._jquery).data('url', this._url);
            $(this._jquery).attr('title', this._title);
            $(this._jquery).text(this._short_title);

            $(this._jquery).data('xml', this._xml);
            //console.log($(this._jquery).data('xml'));
        }
    }


    /**
     * JQueryObjectを出力する
     * @return {JQueryObject} JQuery オブジェクト
     */
    _proto.getJQueryObject = function() {
        return $(this._jquery);
    }
})();

/// @summary 対象のスタンプを取得する。
///    @file loadStamp.xq
/// @param  i_target = 検索対象（下記参照）
///     "PRACTICE"      Practice      => "001"    # 診療行為
///     "INJECTION"     Practice/300    => "001-300"  # 注射(300番台)
///     "TREATMENT"     Practice/400    => "001-400"    # 処置(400番台)
///     "OPERATION"     Practice/500    => "001-500"  # 手術(500番台)
///     "MEDICAL_CHECK"   Practice/600    => "001-600"  # 検査(600番台)
///     "MEDICAL_PRODUCT"   Medical_Product   => "002"    # 医薬品
///     "MACHINE"       Machine       => "003"    # 特定機材
///     "COMMENT"       Comment       => "006"    # コメント
///     "PRIVATE_EXPENSE"   Private_Expense   => "007"    # 自費診療
/// @param callback コールバック関数
/// @return 成功時、指定のスタンプ一覧が返却される。失敗時、スタンプが返却されない。
/// 出力例)
///<Stamp>
///<Orca>
///<Medical_Class/>
///<Medication_Code>096000001</Medication_Code>
///<Medication_Name>文書料</Medication_Name>
///<Medication_Number>1</Medication_Number>
///<Medication_Generic_Flg>yes</Medication_Generic_Flg>
///<Medication_Unit_Point>000003240.00</Medication_Unit_Point>
///<Medication_Unit/>
///</Orca>
///<Eyeehr>
///</Eyeehr>
///</Stamp>
///<Stamp>...</Stamp>
///<Stamp>...</Stamp>
Stamp.LoadXml = function(i_target, callback) {
    const SCRIPT = '/exist/apps/eyeehr/modules/loadStamp.xq';
    var senddata = "target=" + i_target;
    Utility.LoadXml('GET', SCRIPT, senddata, callback);
}
