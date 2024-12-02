function getDataAtual(){
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = addZero(now.getMonth()+1,2); 
    var day     = addZero(now.getDate(),2);
    var hour    = addZero(now.getHours(),2);
    var minute  = addZero(now.getMinutes(),2);
    var second  = addZero(now.getSeconds(),2); 
    var millisecond  = addZero(now.getMilliseconds(),3); 
    var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second+','+millisecond;   
     return dateTime;
}

function addZero(x,n) {
    if (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}