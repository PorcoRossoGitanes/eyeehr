$(function(){
    
    loadMainComplainment();
    window.alert('complainment');
//----
    /// @ summary 主訴呼出
    function loadMainComplainment()
    {
        $.get(
            './cgi-bin/xml2htmlOfStamplsMajorComplaint.cgi',
            {},
            function(data,textStatus){

                if(textStatus=='success'){
                    console.log('success');
                    $('#result').text('SUCCESS');
                    var xml = data;
                    //console.log(xml);
                    
                    var xmldoc = $.parseXML(xml);
                    $xml = $(xmldoc);
                    //console.log($xml);
                    
                    $xml.find('major-complainment').each(function () {
                        var name = $(this).text();
                        $('#stamps').append('<button>' + name + '</button>')
                        //console.log(name);
                    });
                    //console.log($items);

                    // $temp = $xml.find('major-complainment')[0];
                    // console.log($temp);
                }
            }
            ,'html'
        );
        
        if($('#result').text=='')
        {
            $('#result').text('FAILED');
        }        
    } 
//----
});