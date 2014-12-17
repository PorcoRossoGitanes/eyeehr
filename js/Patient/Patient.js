/**
 * @property {String} CollectionRoot カルテのコレクションルート
 * @static
 * @readOnly
 */
Patient.CollectionRoot = '/db/apps/eyeehr/data/Patient/';

/**
 * 患者
 * @class Patient
 * @constructor
 */
 function Patient() {
 	
 };(function() {

 })();

/**
 * 患者情報を取得する。
 * @static
 * @method GetInfo
 * @param {Number} i_patientId
 * @return 患者情報XML
 */
Patient.GetInfo = function (i_patientId) 
{
 	var ret = ret;

    // システム設定を読み込む。
    var json = Config.Load();

	const URL = json.Patient.GetNote.XQ;
	ret = Utility.LoadXml('POST', URL, {patient_id: i_patientId});

	return ret;
}

/**
 * ORCA患者情報を読み込み、XMLDBに登録する。
 * @static
 * @method LoadXmlFromOrcaToXmlDb
 * @param i_patientId 患者番号
 * @return true=成功, false=失敗
 * @remarks ファイルが存在しない場合は新規保存、既存の場合は編集する。
 */
 Patient.LoadXmlFromOrcaToXmlDb = function (i_patientId) 
 {
 	var ret = true;

 	var xml = '';

     // システム設定を読み込む。
    var json = Config.Load();	

 	// ORCAの情報を取得する。
 	if (ret)
 	{
		const URL = json.Orca.Func['patientgetv2'].cgi;
		var doc = Utility.LoadXml('POST', URL, {patient_id: i_patientId});
		console.log(doc);
		xml = Utility.XmlToStr(doc);
		console.log(xml);
		ret = (xml != null);
 	}

	// 上記の情報をXMLDBに登録する。
	if (ret)
	{
		var path = Patient.GetCollectionUrl(i_patientId) + 'Orca.xml'
		console.log(path);
		ret = Utility.SaveXml(path, xml);
	}

	return ret;
}

/**
 * コレクションURLを取得する。
 * @static
 * @method GetCollectionUrl
 * @param {Number} i_patientId 患者番号
 * @param {String} i_date 指定日 yyyyMMdd
 * @param {String} i_time 時刻 hhmmss
 * @return {String} コレクションへのURL
 */
Patient.GetCollectionUrl = function (i_patientId)
{
    var ret = Patient.CollectionRoot +
        'Patient-to-' + (10000 * (Math.floor(i_patientId / 10000) + 1) - 1) + '/' + 
        'Patient-' + i_patientId + '/';
    return ret;
        
}