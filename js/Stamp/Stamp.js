/**
 * スタンプクラス
 * @class Stamp
 * @constructor
 */
var Stamp= function () {

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
            //console.log(this._url);
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

/**
 * @property {String} ClassName クラス名
 * @static
 */
Stamp.ClassName = 'Stamp';

/**
 * @property {String} To 貼付先
 * @static
 */
Stamp.To =  'NoteItemContainer';

/**
 * 対象のスタンプを取得する。
 * @method LoadXml
 * @static
 * @param  {String} i_target = 検索対象（下記参照）
 *      <br/>"PRACTICE"      Practice      => "001"    # 診療行為
 *      <br/>"INJECTION"     Practice/300    => "001-300"  # 注射(300番台)
 *      <br/>"TREATMENT"     Practice/400    => "001-400"    # 処置(400番台)
 *      <br/>"OPERATION"     Practice/500    => "001-500"  # 手術(500番台)
 *      <br/>"MEDICAL_CHECK"   Practice/600    => "001-600"  # 検査(600番台)
 *      <br/>"MEDICAL_PRODUCT"   Medical_Product   => "002"    # 医薬品
 *      <br/>"MACHINE"       Machine       => "003"    # 特定機材
 *      <br/>"COMMENT"       Comment       => "006"    # コメント
 *      <br/>"PRIVATE_EXPENSE"   Private_Expense   => "007"    # 自費診療
 *  @param callback コールバック関数
 *  @return 成功時、指定のスタンプ一覧が返却される。失敗時、スタンプが返却されない。
 *  出力例)
 * <br/>&lt;Stamp&gt;
 * <br/>&lt;Orca&gt;
 * <br/>&lt;Medical_Class/&gt;
 * <br/>&lt;Medication_Code&gt;096000001&lt;/Medication_Code&gt;
 * <br/>&lt;Medication_Name&gt;文書料&lt;/Medication_Name&gt;
 * <br/>&lt;Medication_Number&gt;1&lt;/Medication_Number&gt;
 * <br/>&lt;Medication_Generic_Flg&gt;yes&lt;/Medication_Generic_Flg&gt;
 * <br/>&lt;Medication_Unit_Point&gt;000003240.00&lt;/Medication_Unit_Point&gt;
 * <br/>&lt;Medication_Unit/&gt;
 * <br/>&lt;/Orca&gt;
 * <br/>&lt;Eyeehr&gt;
 * <br/>&lt;/Eyeehr&gt;
 * <br/>&lt;/Stamp&gt;
 * <br/>&lt;Stamp&gt;...&lt;/Stamp&gt;
 * <br/>&lt;Stamp&gt;...&lt;/Stamp&gt;
 */
Stamp.LoadXml = function(i_target, callback) {

    /**
     * @property {String} SCRIPT スタンプ読込スクリプト
     * @final
     */
    const SCRIPT = '/exist/apps/eyeehr/modules/loadStamp.xq';
    var senddata = "target=" + i_target;
    Utility.LoadXml('GET', SCRIPT, senddata, callback);
}

/**
 * スタンプからノートアイテムを生成する。
 * @method CreateNoteItem
 * @static
 * @param {Object} i_jquery スタンプオブジェクト
 * @param {String} i_to 貼付先（NoteItemContainer）
 * @return ノートアイテム
 */
Stamp.CreateNoteItem = function(i_jquery, i_to) {

    var item = null;

    switch (i_to) {
        case NoteItemContainerComplaint.ClassName:
            item = new NoteItemComplaint();
            break;
        case NoteItemContainerDisease.ClassName:
            item = new NoteItemDisease();
            break;
        case NoteItemContainerMedicalCheck.ClassName:
            item = new NoteItemMedicalCheck();
            break;
        case NoteItemContainerMemo.ClassName:
            item = new NoteItemMemo();
            break;
        case NoteItemContainerOperation.ClassName:
            item = new NoteItemOperation();
            break;
        case NoteItemContainerPrescription.ClassName:
            item = new NoteItemPrescription();
            break;
        case NoteItemContainerScheme.ClassName:
            item = new NoteItemScheme();
            break;
        case NoteItemContainerTreatment.ClassName:
            item = new NoteItemTreatment();
            break;
        default:
            break;
    }

    if (item)
    {
        // タイトルを設定する。
        item.setTitle($(i_jquery).attr('title'));

        // ORCA情報を設定する。
        var xml = $(i_jquery).data('xml'); 
        item.setOrca($(xml).children('Orca')[0]); 

        // 主訴・メモの場合は備考入力のみのため、備考入力欄を開く。
        switch (typeof(item)) {
            case NoteItemComplaint.ClassName:
            case NoteItemMemo.ClassName:
                item.openRemark();
                break;
            default:
                break;
        }

    }

    return item;
}
