$(function(){

	// テンプレートを呼び出す。
	var xml = Utility.LoadXml(
		'REST', 
		'/db/apps/eyeehr/template/Marker/Marker-template/Marker.xml'
	);

// フォーム<div id="form">生成------------------------------------------
	$form = $('<form class="form-horizontal" role="form"></form>');

	var id = 'Status';
	var label = '状態';
	var placeholder = '状態';
	$form.append(
		'<div class="form-group">' +
		'<label for="' + id + '" class="col-sm-2 control-label">' + label + '</label>' +
		'<div class="col-sm-10"><input type="text" class="form-control" id="' + id + '" placeholder="' + placeholder + '"></div>'+ 
		'</div>'
	);

	$(xml).children().each(function(){

		var tag = $(this)[0].tagName;//console.log(tag);

		$(this).children().each(function () {
			
			var id = $(this)[0].tagName;
			var label = $(this).data('label');
			var placeholder = $(this).text();

			switch ($(this).attr('type'))
			{
				case 'file' : 
					$form.append(
						'<div class="form-group">' +
						'<label for="' + id + '" class="col-sm-2 control-label">' + label + '</label>' +
						'<input type="file" id="' + id + '">' + 
						'</div>'
					);
					$form.append(
						'<div class="form-group">' +
						'<label for="preview" class="col-sm-2 control-label">プレビュー</label>' +
						'<img class="img-circle" src="" id="preview" style="display:none;"/>' + 
						'</div>'
					);
					
					/**
					 * @event ファイルが指定された場合、プレビューを表示する。
					 */
					$form.find('#' + id).change(function() {
						
						// ファイルの内容がある場合、プレビューを表示する。
						if (this.files.length) 
						{
							var file = $(this).prop('files')[0];	
							var fr = new FileReader();
							fr.onload = function() {
								$('#preview').attr('src', fr.result ).css('display','inline');
							}
							fr.readAsDataURL(file);
						}
					});
				break;
				default:
					$form.append(
						'<div class="form-group">' + 
						'<label for="' + id + '" class="col-sm-2 control-label">' + label + '</label>' + 
						'<div class="col-sm-10"><input type="text" class="form-control" id="' + id + '" placeholder="' + placeholder + '"></div>'+ 
						'</div>'
					);
				break;
			}
		});
	});

	$form.append(
		'<div class="form-group"><div class="col-sm-offset-2 col-sm-10">' +
		'<button type="submit" class="btn btn-default">　登　録　</button>' + 
		'<button type="reset" class="btn btn-default">キャンセル</button>' + 
		'</div>'
	);
	
	$('#form').append($form);

// 検索結果テーブル生成--------------------------------------------------
	$table = $(
		'<table class="table table-striped">' + 
		'<thead>' + 
		'<tr id="tag">' + 
		'</tr>' + 
		'<tr id="label">' + 
		'</tr>' + 
		'</thead>' + 
		'<tbody>' +
		'<tr>' +
		'</tr>' +				
		'</tbody>' +
		'</table>'
	);

	$(xml).children().each(function(){

		var tag = $(this)[0].tagName;//console.log(tag);

		$(this).children().each(function () {
			
			var id = $(this)[0].tagName;
			var label = $(this).data('label');
			//var placeholder = $(this).text();

			$table.find('thead tr#tag').append('<th>' + id +'</th>');
			$table.find('thead tr#label').append('<th>' + label +'</th>');
		});
		$table.find('thead tr#tag').append('<th>' + '&nbsp;' +'</th>');
		$table.find('thead tr#label').append('<th>' + '削除' +'</th>');
	});

	$('#result').append($table);

});