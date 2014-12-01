//----- nicEdit -----

// @summary nicEditの呼び込み時、入力欄を追加する。
bkLib.onDomLoaded(function() {

    const ID = 'remark';
        
    // GET値を取得する。
    console.log(Utility);
    var get = GetQueryString();
    var noteItemId = get['id']; //console.log(noteItemId);
    var original = get['content']; //console.log(original);
    
    var area = new nicEditor(
    {
        buttonList:[
            'save', // 「保存ボタンを追加した。」
            'bold',
            'italic',
            'underline', 
            //'forecolor',
            'forecolor-black',
            'forecolor-red',
            'forecolor-blue',
            'forecolor-green',
            'forecolor-brown',
            'forecolor-yellow',
            // 'bgcolor',
            // 'bgcolor-black',
            'bgcolor-red',
            'bgcolor-blue',
            'bgcolor-green',
            'bgcolor-brown',
            'bgcolor-yellow'//,
            // 'image',
            // 'upload'
        ],

        //convertToText:true

        // 「保存」ボタン押下時、付箋の備考を保存する。
        onSave : function(content, id, instance) {  
            
            console.log('onsave');
            console.log(noteItemId);
            console.log(memo);
            console.log(id);

            

            // IDが存在すれば、付箋を更新する。
            if (noteItemId != '')
            {
                // 変更内容を取得する。
                var memo = content;
                memo = memo.replace(/<div>/g, '<br />');
                memo = memo.replace(/<\/div>/g, '');
                window.opener.ChangeRemark(noteItemId, memo);
            }
        }
    }).panelInstance(ID);

    // 元の備考内容を設定する。
    area.instanceById('remark').setContent(original);
});


function GetQueryString ()
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring( 1 );

        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            // パラメータ名をキーとして連想配列に追加する
            result[ paramName ] = paramValue;
        }
    }
    return result;
}

//----- nicEdit -----