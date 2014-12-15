/**
 * @property {String} Classnameクラス名
 * @static
 * @readOnly
 */
Note.ClassName = 'Note';

/**
 * @property {String} CollectionRoot カルテのコレクションルート
 * @static
 * @readOnly
 */
Note.CollectionRoot = '/db/apps/eyeehr/data/Note/';

/**
 * @property タグ：ヘッダー
 * @static
 * @readOnly
 */
Note.TagHead = 'Head';

/**
 * @property タグ：作成日(yyyyMMdd)
 * @static
 * @readOnly
 */
Note.TegDate = 'Date';

/**
 * @property タグ：作成時刻(hhmmss)
 * @static
 * @readOnly
 */
Note.TagTime = 'Time';

/**
 * @property タグ：主治医
 * @static
 * @readOnly
 */
Note.TagDoctor = 'Doctor';

/**
 * @property タグ：患者
 * @static
 * @readOnly
 */
Note.TagPatient = 'Patient'

/**
 * カルテノート <div name="Note"/>
 * 指定のカルテが存在する場合は、カルテを読込んだ後、インスタンスを返却する。
 * 指定のカルテが存在しない場合は、カルテを新規作成し、インスタンスを返却する。
 * @class Note
 * @param {Number} i_patient 患者番号
 * @param {String} i_date 作成日（yyyyMMdd）
 * @param {String} i_time 作成時刻（hhmmss）
 * @param {Number} i_doctor 主治医番号（スタッフ番号）
 * @constructor
 */
function Note(i_patient, i_date, i_time, i_doctor) {

    /**
     * @property {Number} _patient_id 患者番号
     */
    this._patient = i_patient;

    /**
     * @property {String} _date 作成日
     */
    this._date = i_date;

    /**
     * @property {String} _time 作成時刻
     */
    this._time = i_time;

    /**
     * @property {Number} _doctor 主治医番号（スタッフ番号）
     */
    this._doctor = i_doctor;

    /**
     * @property {String} _collection コレクションパス
     * (root)/Note/Patient-9999(*1)/Patient-n(*2)/yyyymmdd/hhmmss
     */
    this._collection = Note.GetCollectionUrl(this._patient, this._date, this._time);


    /**
     * @property {String} _filename ファイル名（ドキュメント）
     */
    this._filename = Note.ClassName + '-' + this._patient + '-' + this._date + '-' + this._time + '-' + '{0}' + '.xml';

    /**
     * @property {Object} $jquery JQueryオブジェクト
     */
    $jquery = $('[name="' + Note.ClassName + '"]');

    // ファイル添付用に現在のコレクションを退避しておく。（NoteItemで使用する。）
    $jquery.data('Collection', this._collection);

    // デバッグ用
    console.log(Note.TagPatient + ':' + this._patient);
    console.log(Note.TegDate + ':' + this._date);
    console.log(Note.TagTime + ':' + this._time);
    console.log('Collection' + ':' + this._collection);

    // データーが存在すれば、DBから読込。
    var exist = Note.Exist(this._patient, this._date, this._time);
    if (exist) {
        this.loadXml(this._patient, this._date, this._time);
    } else {
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
    }
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

        if (ret) {
            ret = ($jquery.children().length > 0);
        }

        if (ret) {
            var xmlDebug = '';

            // ■ヘッダー情報（患者・主治医・作成日時）
            var dir = this._collection;
            var xml = '';
            xml += '<' + Note.TagHead + '>';
            xml += '<' + Note.TagPatient + '>' + this._patient + '</' + Note.TagPatient + '>';
            xml += '<' + Note.TegDate + '>' + this._date + '</' + Note.TegDate + '>';
            xml += '<' + Note.TagTime + '>' + this._time + '</' + Note.TagTime + '>';
            xml += '<' + Note.TagDoctor + '>' + this._doctor + '</' + Note.TagDoctor + '>'; // TODO : 1番決め打ち
            xml += '</' + Note.TagHead + '>';
            var path = dir + 'Head.xml'
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // （１）主訴コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerComplaint.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerComplaint.ClassName));
            var path = dir + this._filename.format(NoteItemContainerComplaint.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // ■明細情報
            // （２）病名コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerDisease.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerDisease.ClassName));
            var path = dir + this._filename.format(NoteItemContainerDisease.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // （３）検査コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerMedicalCheck.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerMedicalCheck.ClassName));
            var path = dir + this._filename.format(NoteItemContainerMedicalCheck.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // （４）メモコンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerMemo.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerMemo.ClassName));
            var path = dir + this._filename.format(NoteItemContainerMemo.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // （５）手術コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerOperation.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerOperation.ClassName));
            var path = dir + this._filename.format(NoteItemContainerOperation.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // （６）処方コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerPrescription.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerPrescription.ClassName));
            var path = dir + this._filename.format(NoteItemContainerPrescription.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            // // （７）シェーマコンテナのコレクションを作成し、XMLデーターを保存する。
            // ret = ret && Utility.CreateCollection(this._collection + NoteItemContainerScheme.ClassName);
            // var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerScheme.ClassName));
            // var path = dir + this._filename.format(NoteItemContainerScheme.ClassName);
            // ret = ret && Utility.SaveXml(path, xml);
            //if (ret) xmlDebug += xml;

            // （８）処置コンテナのコレクションを作成し、XMLデーターを保存する。
            var dir = this._collection + NoteItemContainerTreatment.ClassName;
            var xml = NoteItemContainer.HtmlToXml($jquery.children('.' + NoteItemContainerTreatment.ClassName));
            var path = dir + this._filename.format(NoteItemContainerTreatment.ClassName);
            ret = ret && Utility.SaveXml(path, xml);
            if (ret) xmlDebug += xml;

            if (ret) console.log(xmlDebug);
        }

        // 完了メッセージを表示する。
        var message = ret ? 'XMLデーターの保存が成功しました。' : 'XMLデーターの保存が失敗しました。';
        alert(message);

        return ret;
    }

    /**
     * カルテ（XMLファイル）を読込む。
     * @method loadXml
     * @param {Number} i_patinetId 患者番号
     * @param {String} i_date 作成日(yyyyMMdd)
     * @param {String} i_time 作成時刻(hhmmss)
     * @param {Number} i_doctor 医師番号（スタッフ番号）
     * @return {Boolean} true=成功、false=失敗
     * TODO : 医師情報で絞れていない。
     */
    _proto.loadXml = function(i_patientId, i_date, i_time, i_doctor) {
        var ret = false;

        // DBから指定のカルテを読み込む。
        const URL = '/exist/apps/eyeehr/modules/get-note.xq';
        var doc = Utility.LoadXml(
            'POST',
            URL, {
                'patient_id': i_patientId,
                'date': i_date,
                'time': i_time
            }
        );

        // XMLデーターを取得出来る場合、XMLデーターよりカルテを作成する。
        if (doc)
        {
            var xml = doc.children;
            console.log(xml);
            this.setByXml(xml);

            ret = true;
        }
        return ret;
    }

    /**
     * XMLからカルテを設定する。
     * @method setByXml
     * @param {String/Object} i_xml XML <Note />
     */
    _proto.setByXml = function(i_xml) {

        // 現在のカルテを空にする。
        $jquery.empty();

        $note = $(i_xml);
        //console.log($note[0]);

        var patient = null;
        var date = null;
        var time = null;
        var doctor = new Array();

        $note.children().each(function() {

            var container = null;

            switch ($(this)[0].tagName) {
                // case Note.TagHead:
                //     // ヘッダ情報を取得する。
                //     patient = Utility.InnerXml($(this).children(Note.TagPatient));
                //     date = Utility.InnerXml($(this).children(Note.TegDate));
                //     time = Utility.InnerXml($(this).children(Note.TagTime));
                //     doctor = Utility.InnerXml($(this).children(Note.TagDoctor));
                //     //console.log(this);
                //     break;
                case NoteItemContainerComplaint.ClassName:
                    // 主訴のNoteItemContainerを作成する。
                    container = new NoteItemContainerComplaint();
                    break;
                case NoteItemContainerDisease.ClassName:
                    // 病名のNoteItemContainerを作成する。 
                    container = new NoteItemContainerDisease();
                    break;
                case NoteItemContainerMedicalCheck.ClassName:
                    // 検査のNoteItemContainerを作成する。
                    container = new NoteItemContainerMedicalCheck();
                    break;
                case NoteItemContainerTreatment.ClassName:
                    // 処置のNoteItemContainerを作成する。
                    container = new NoteItemContainerTreatment();
                    break;
                case NoteItemContainerPrescription.ClassName:
                    // 処方のNoteItemContainerを作成する。
                    container = new NoteItemContainerPrescription();
                    break;
                case NoteItemContainerOperation.ClassName:
                    // 手術のNoteItemContainerを作成する。
                    container = new NoteItemContainerOperation();
                    break;
                case NoteItemContainerMemo.ClassName:
                    // メモのNoteItemContainerを作成する。
                    container = new NoteItemContainerMemo();
                    break;
                case NoteItemContainerScheme.ClassName:
                    // シェーマのNoteItemContainerを作成する。
                    container = new NoteItemContainerScheme();
                    break;
                default:
                    break;
            }

            if (container) {
                container.setByXml($(this));
                $jquery.append(container.getJQueryObject());
            }
        });

        // this._patient = patient;
        // this._date = date;
        // this._time = time;
        // this._doctor = doctor;
    }
})();

/**
 * 患者の指定日時のカルテが存在するか確認する。
 * 時刻は未指定可、時刻が未指定の場合は患者の指定日のカルテが存在するか確認する。
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 日付(yyyyMMdd)
 * @param {String} i_time 時刻(hhmmss)
 * @return true=カルテが存在する。false=カルテが存在しない。
 */
Note.Exist = function(i_patientId, i_date, i_time) {

    var ret = false;
    
    var text = Utility.XmlToStr(Note.GetNoteList(i_patientId));

    if (window.DOMParser) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, "text/xml");

        // 時刻が設定されている場合は、時刻も含めて検索する。
        // それ以外の場合は、日付で検索する。
        var path = '';
        if (i_time) {
            path = '/Notes/Note[contains(.,"' + i_date + '/' + i_time + '")]';
        } else {
            path = '/Notes/Note[contains(.,"' + i_date + '")]';
        }

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
        }
    }
    return ret;
}

/**
 * 指定の患者のカルテ内容をすべて取得する。
 * @method GetNotes
 * @param {Number} i_patientId 患者番号
 */
Note.GetNotes = function (i_patientId)
{
    const URL = '/exist/apps/eyeehr/modules/get-patient-notes.xq';

    var ret = (Utility.LoadXml('POST', URL, {
        'patient_id': i_patientId
    }));
    console.log(ret);

    return ret;
}
/**
 * 指定患者の指定日のカルテのコレクション一覧を取得する。
 * @method GetNoteList
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 指定日（未指定の場合）全カルテを検索する。
 * @return {Object} <Notes />
 */
Note.GetNoteList = function(i_patientId, i_date) {
    const URL = '/exist/apps/eyeehr/modules/get-patient-note-list.xq';

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
 * コレクションURLを取得する。
 * @method GetCollectionUrl
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 指定日 yyyyMMdd
 * @param {String} i_time 時刻 hhmmss
 * @return {String} コレクションへのURL
 */
Note.GetCollectionUrl = function (i_patientId, i_date, i_time)
{
    var ret = Note.CollectionRoot +
        'Patient-to-' + (10000 * (Math.floor(i_patientId / 10000) + 1) - 1) + '/' +
        'Patient-' + i_patientId + '/' + i_date + '/' + i_time + '/';
    return ret;
        
}
