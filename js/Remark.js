$(function (){
//----- GET値を取得する。 -----

    /**
     * @param {Hashtable} GET値
     */ 
    var get = Utility.GetQueryString();
    /**
     * @param {String} NoteItem ID
     */
    var noteItemId = get['id']; 
    /**
     * @param {String} 備考の内容
     */
    var original = get['content']; //

//----- nicEdit -----
    var area = null;
    const ID = 'remark';

    // @summary nicEditの呼び込み時、入力欄を追加する。
    bkLib.onDomLoaded(function() {

        area = new nicEditor(
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
            onSave : function(content, id, instance) { save(); }

        }).panelInstance(ID);

        // 元の備考内容を設定する。
        area.instanceById(ID).setContent(cur);
    });

//----- 自動保存 -----


    /**
     * @param {String} 直前の備考の内容（文字列）
     */
    var pre = original;

    /**
     * @param {String} 現在の備考の内容（文字列）
    */
    var cur = pre;

    /**
     * @param {boolean} 保存要否フラグ
     */
    var save_required = false;

    /**
     * @prama {boolean} 保存完了フラグ
     */
    var save_complete = true;

    /**
     * @summary 自動保存を開始する。
     * @param {String} i_execute 実行処理（関数）
     * @param {Number} タイマー間隔（ミリ秒）
     */
    function AutoSaveStart (i_execute, i_interval) { setInterval(i_execute, i_interval); }

    /**
     * @summary 自動保存を終了する。
     */
    function AutoSaveEnd (i_save) { if (i_save) CheckSave(); }

    /**
     * @prama ウィンドウを閉じる前に、自動保存を終了する。
     */
    $(window).bind("beforeunload", function() { AutoSaveEnd(false); });

    // 自動保存を開始する。
    AutoSaveStart(CheckSave, 3000);

    /**
     * @summary 保存確認処理：変更があれば、変更を保存する。
     */
    function CheckSave () 
    {
        // 現在の文字列を取得する。
        cur = area.instanceById(ID).getContent();

        // 変更要否を確認する。（現在の文字列と直前の文字列が異なれば、変更必要と見なす。）
        save_required = (cur != pre);

        // 変更完了状態で変更が必要な場合、自動保存を実行する。
        if( save_required && save_complete ) {

            pre = cur; // 現在の文字列を以前の文字列として設定する。
            save_required = false; // 変更不要に戻す。
            save_complete = false; // 変更未完了に戻す。

            $('#result').hide();

            save_complete = Save();　// 保存処理を実行する。

            $('#result').fadeIn('slow');
            $('#result').fadeOut('slow');
        }
    }

    /**
     * @summary 保存処理：電子カルテに内容を送信する。
     */
    function Save() 
    {
        var ret = false;

        // IDが存在すれば、付箋を更新する。
        if(window.opener && (noteItemId != '')) {
            
            var memo = cur;
            memo = memo.replace(/<div>/g, '<br />');
            memo = memo.replace(/<\/div>/g, '');
            curContent = memo;

            // 電子カルテ側の備考を更新する。
            window.opener.ChangeRemark(noteItemId, memo);

            ret = true;
        }

        return ret;  
    }

//----- 手動保存 -----

    /**
     * @event 「保存」ボタン押下時、電子カルテへの備考の保存処理を実行する。
     */
    $('#save').click(function () { Save(); });

//----- キャンセル -----
    /**
     * @event 「キャンセル」ボタン押下時、備考入力画面を閉じる。 
     */
    $('#cancel').click(function () { window.close(); });
});




