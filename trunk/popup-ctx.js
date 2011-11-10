/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

document.onclick=check; 
var popUpNew = 0;
function check(e){ 
    var target = (e && e.target) || (event && event.srcElement); 
    var obj = document.getElementById('ctx'); 
    if ( ( target != obj ) && ( 0 >= popUpNew-- ) ) {
        popUpNew = 0; // make sure we are not going negative here!
        obj.style.display='none';
    } 
} 

var ctxRequest;

function ctx(request, x, y){ 
    ctxRequest = request;
    popUpNew = 1; // mark that we were clicking once
    var obj = document.getElementById('ctx'); 
    if( obj ){

        if( ( 'iframe' == request.id )
        ||  ( 'src'    == request.id )
        ) {
            var url = request.innerHTML.replace(/^src=/, ''); // remove 'src='
            var site = url.replace(/^[a-zA-Z]+:\/\//, ''); // remove protocol
            site = site.replace(/\/.*$/, ''); // remove path and parameters
            site = site.replace(/\?.*$/, ''); // remove parameters
            var domain = site.replace(/^www./, ''); // need to find a better way for this!!!

            obj.innerHTML =
                '<div><a target="_blank" href="http://aceinsight.websense.com/Results.aspx?url='+url+'">AceInsight</a></div>'+
                '<div><a target="_blank" href="http://www.mywot.com/en/scorecard/'+site+'">myWOT</a></div>'+
                '<div><a target="_blank" href="http://www.robtex.com/dns/'+site+'.html#result">robtex</a></div>'+
                '<div><a target="_blank" href="http://www.robtex.com/dns/'+domain+'.html#whois">whois</a></div>'+
            '';

            obj.style.display='block';
            obj.style.top=y;
            obj.style.left=x;
        }
        else if ( 'script' == request.id ) {
            var url = request.innerHTML.replace(/^src=/, ''); // remove 'src='
            var site = url.replace(/^[a-zA-Z]+:\/\//, ''); // remove protocol
            site = site.replace(/\/.*$/, ''); // remove path and parameters
            site = site.replace(/\?.*$/, ''); // remove parameters
            var domain = site.replace(/^www./, ''); // need to find a better way for this!!!

            obj.innerHTML =
                '<div onclick="click(this)" id="decode">Decode</div>'+
                '<div onclick="click(this)" id="ltrace-this">Behaviour Analysis</div>'+
            '';

            obj.style.display='block';
            obj.style.top=y;
            obj.style.left=x;
        }
        else {
            obj.style.display='none';
        }

    } 
} 

