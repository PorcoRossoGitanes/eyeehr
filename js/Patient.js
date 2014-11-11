///@summary カルテ
function Patient() {
};(function() {

	/// @summary XMLを読込む。
	/// @param i_path ファイルパス(URL)
	/// @remarks ファイルが存在しない場合は新規保存、既存の場合は編集する。
	Patient.LoadXmlFromOrca = function () 
	{
		// 画像をXMLDB上に保存する。
	    var url = 'http://192.168.24.117:8000/api01rv2/patientgetv2?id=1233';
	    //console.log(url);

		$.ajax({
		  	async 	: false, 	// 同期通信
		  	url 	: url,
		  	type 	:'GET',
		  	cache 	: false,
			success: function(data) {
				alert(data);
				//if(callback !== undefined) callback($(data)); 
	     	},
	      	error: function(XMLHttpRequest, textStatus, errorThrown) 
	      	{
	      		alert('画像の読込みに失敗しました。: ' + 
	      			XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message
	      		);
	        	// $("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
	        	// $("#textStatus").html("textStatus : " + textStatus);
	        	// $("#errorThrown").html("errorThrown : " + errorThrown.message);
	     	},
			// complete : function(data) 
			// {
			// 	console.log('画像をXMLDBに保存する処理が完了した。');
			//     //alert("finishi");
			// }
		});
	}
})