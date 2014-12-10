/**
 * カルテノート <div name="Note"/>
 * @class Note
 * @constructor
 */
function Note(i_patientId, i_yyyyMMdd, i_hhmmss) {

    /**
     * @property {Number} _patient_id 患者番号
     */
    this._patientId = i_patientId;

    /**
     * @property {String} _yyyyMMdd 作成日
     */
    this._yyyyMMdd = i_yyyyMMdd;

    /**
     * @property {String} _hhmmss 作成時刻
     */
    this._hhmmss = i_hhmmss;

    /**
     * @property {String} _collection コレクションパス
     * (root)/Note/Patient-9999(*1)/Patient-n(*2)/yyyymmdd/hhmmss
     */
    this._collection =
        Note.CollectionRoot +
        'patient-to-' + (10000 * (Math.floor(i_patientId / 10000) + 1) - 1) + '/' +
        'patient-' + this._patientId + '/' +
        this._yyyyMMdd + '/' + this._hhmmss + '/';

    /**
     * @property {String} _filename ファイル名（ドキュメント）
     */
    this._filename = Note.ClassName + '-' + this._patientId + '-' + this._yyyyMMdd + '-' + this._hhmmss + '-' + '{0}' + '.xml';

    /**
     * @property {Object} $jquery JQueryオブジェクト
     */
    $jquery = $('[name="' + Note.ClassName + '"]');

    // コレクション（保存先）を退避する。
    $jquery.data('PatintId', this._patientId);
    $jquery.data('Date', this._yyyyMMdd);
    $jquery.data('Time', this._hhmmss);
    $jquery.data('Collection', this._collection);

    // カルテ(JQuery オブジェクト)を空にする。
    $jquery.empty();

    // NoteContainerを追加する。
    var containerComplaint = new NoteItemContainerComplaint();
    $jquery.append(containerComplaint.getJQueryObject());
    var containerDisease = new NoteItemContainerDisease();
    $jquery.append(containerDisease.getJQueryObject());
    var containerMedicalCheck = new NoteItemContainerMedicalCheck();
    $jquery.append(containerMedicalCheck.getJQueryObject());
    var containerTreatment = new NoteItemContainerTreatment();
    $jquery.append(containerTreatment.getJQueryObject());
    var containerPrescription = new NoteItemContainerPrescription();
    $jquery.append(containerPrescription.getJQueryObject());
    var containerOperation = new NoteItemContainerOperation();
    $jquery.append(containerOperation.getJQueryObject());
    var containerMemo = new NoteItemContainerMemo();
    $jquery.append(containerMemo.getJQueryObject());
    // var containerScheme = new NoteItemContainerScheme();
    // $jquery.append(containerScheme.getJQueryObject());

};
(function() {

    /**
     * プロトタイプ
     * @type {Object}
     */
    var _proto = Note.prototype;

    /**
     * クラス名（親クラス...現在のクラス）を取得する
     * @method getName
     * @return {String} クラス名（親クラス...現在のクラス）
     */
    _proto.getName = function() {
        return Note.ClassName;
    }

    /**
     * コレクションパスを取得する。
     * @method getCollection
     * @return コレクションパス(ex:/db/apps/eyeehr/data/Note/patient-9999/patient-1/yyyyMMdd/hhmmss/)
     */
    _proto.getCollection = function() {
        return this._collection;
    }

    /**
     * @summary カルテ（XMLファイル）を保存する
     */
    _proto.saveXml = function() {
        var ret = true;

        // （１）主訴コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerComplaint.ClassName;
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerComplaint.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerComplaint.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // （２）病名コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerDisease.ClassName;
        // ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerDisease.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerDisease.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // （３）検査コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerMedicalCheck.ClassName;
        // ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerMedicalCheck.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerMedicalCheck.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // （４）メモコンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerMemo.ClassName;
        //ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerMemo.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerMemo.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // （５）手術コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerOperation.ClassName;
        ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerOperation.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerOperation.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // （６）処方コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerPrescription.ClassName;
        ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerPrescription.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerPrescription.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        // // （７）シェーマコンテナのコレクションを作成し、XMLデーターを保存する。
        // ret = ret && Utility.CreateCollection(this._collection + NoteItemContainerScheme.ClassName);
        // var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerScheme.ClassName));
        // var path = this._collection + this._filename.format(NoteItemContainerScheme.ClassName);
        // ret = ret && Utility.SaveXml(path, xml);

        // （８）処置コンテナのコレクションを作成し、XMLデーターを保存する。
        var dir = this._collection + NoteItemContainerTreatment.ClassName;
        ret = ret && Utility.CreateCollection(dir);
        var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerTreatment.ClassName));
        var path = dir + '/' + this._filename.format(NoteItemContainerTreatment.ClassName);
        ret = ret && Utility.SaveXml(path, xml);

        if (ret) {
            var message_success = 'XMLデーターの保存が成功しました。';

            // 完了メッセージを表示する。
            alert(message_success);
        } else {
            var message_error = 'XMLデーターの保存が失敗しました。';

            // 完了メッセージを表示する。
            alert(message_error);
        }

        return ret;
    }

    /**
     * @summary カルテ（XMLファイル）を読込む。
     * @param {Number} i_patinetId 患者番号
     * @param {String} i_yyyyMMdd 作成日
     * @param {String} i_hhmmss 作成時刻
     */
    _proto.loadXml = function(i_patientId, i_yyyyMMdd, i_hhmmss) {
        var xml = Utility.LoadXml(
            'POST',
            '/exist/apps/eyeehr/modules/get-note.xq', {
                'patient_id': i_patientId,
                'date': i_yyyyMMdd,
                'time': i_hhmmss
            }
        ).children;

        this.setByXml(xml);
    }

    /**
     * XMLからカルテを設定する。
     * @static
     * @method setByXml
     * @param {String/Object} i_xml XML <Note />
     */
    _proto.setByXml = function(i_xml) {
        // 現在のカルテを空にする。
        $jquery.empty();

        $note = $(i_xml);
        console.log($note[0]);

        $note.children().each(function() {

            var container = null;
            console.log($(this)[0].tagName);
            switch ($(this)[0].tagName) {
                case NoteItemContainerComplaint.ClassName: // 主訴
                    container = new NoteItemContainerComplaint();
                    break;
                case NoteItemContainerDisease.ClassName: // 病名 
                    container = new NoteItemContainerDisease();
                    break;
                case NoteItemContainerMedicalCheck.ClassName:
                    　 // 検査
                    container = new NoteItemContainerMedicalCheck();
                    break;
                case NoteItemContainerTreatment.ClassName: // 処置
                    container = new NoteItemContainerTreatment();
                    break;
                case NoteItemContainerPrescription.ClassName: // 処方
                    container = new NoteItemContainerPrescription();
                    break;
                case NoteItemContainerOperation.ClassName: // 手術
                    container = new NoteItemContainerOperation();
                    break;
                case NoteItemContainerMemo.ClassName: // メモ
                    container = new NoteItemContainerMemo();
                    break;
                case NoteItemContainerScheme.ClassName:
                    　 // シェーマ
                    container = new NoteItemContainerScheme();
                    break;
                default:
                    break;
            }
            container.setByXml($(this));
            $jquery.append(container.getJQueryObject());
        });
    }
})();

/**
 * 患者の指定日のカルテが存在するか確認する。
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 日付(yyyyMMdd)
 * @return true=カルテが存在する。false=カルテが存在しない。
 */
Note.Exist = function(i_patientId, i_date) {
    var ret = true;
    var text = Utility.XmlToStr(Note.GetNoteList(i_patientId));

    if (window.DOMParser) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, "text/xml");
        var path = '/Notes/Note[contains(.,"' + i_date + '")]';

        if (document.implementation && document.implementation.createDocument) {
            var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

            var result = nodes.iterateNext();
            var length = 0;

            while (result) {
                //console.log(result.childNodes[0].nodeValue);
                length += 1;
                result = nodes.iterateNext();
            }

            // ノード数が1以上であれば、カルテが存在する。
            ret = (length > 0);
        } else {
            ret = false;
        }
    } else {
        ret = false;
    }
    return ret;
}

/**
 * 指定患者の指定日時のカルテを新規作成する。
 * @method Create
 * @param {Number} i_patientId 患者番号
 * @param {String} i_yyyyMMdd 作成日(yyyyMMdd)
 * @param {String} i_hhmmss 作成時刻(hhmmss)
 * @return {Note} Noteオブジェクト
 */
Note.Create = function(i_patientId, i_yyyyMMdd, i_hhmmss) {
    var ret = new Note(i_patientId, i_yyyyMMdd, i_hhmmss);
    return ret;
}

/**
 * 指定患者の指定日のカルテのコレクション一覧を取得する。
 * @method Create
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 指定日（未指定の場合）全カルテを検索する。
 * @return {Object} <Notes />
 */
Note.GetNoteList = function(i_patientId, i_date) {
    const URL = '/exist/apps/eyeehr/modules/get-note-list.xq';

    var ret = (Utility.LoadXml('POST', URL, {
        'patient_id': i_patientId
    }));

    return ret;
}

/**
 * HTMLをXMLに保存する。
 * @method HtmlNoteToXml
 * @param  {JQuery Object} $i_jquery HTML（入力フォーム）を含む <input/>,<textarea/>,<select/> ...等
 */
Note.HtmlNoteToXml = function($i_jquery) {
    var retVal = '';
    var tag = $i_jquery.attr('name');

    retVal += '<' + tag + ' id="' + $i_jquery.attr('id') + '">';

    //TODO :  ヘッダー情報を保存する。
    $i_jquery.children('div.NoteItemContainer').each(function() {
        retVal += NoteItemContainer.HtmlToXml($(this));
    })

    retVal += '</' + tag + '>';

    return retVal;
}

/**
 * @property {String} Classnameクラス名
 * @static
 * @type {String}
 * @default Note
 */
Note.ClassName = 'Note';

Note.CollectionRoot = '/db/apps/eyeehr/data/Note/';

/**
 * フォーマット関数
 */
String.prototype.format = function(arg) {
    var rep_fn = undefined;

    if (typeof arg == "object") {
        rep_fn = function(m, k) {
            return arg[k];
        }
    } else {
        var args = arguments;
        rep_fn = function(m, k) {
            return args[parseInt(k)];
        }
    }

    return this.replace(/\{(\w+)\}/g, rep_fn);
}
