/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

document.onclick=check; 
var popUpNew = 0;
function check(e){ 
    var target = (e && e.target) || (event && event.srcElement); 
    var ctxMenu = document.getElementById('ctxMenu'); 
    if ( ( target != ctxMenu ) && ( 0 >= popUpNew-- ) ) {
        popUpNew = 0; // make sure we are not going negative here!
        ctxMenu.style.display='none';
    } 
} 

function clickCtx(menu) {
    document.body.innerHTML = "CTX: " + menu.elements['a'];
}

// we need the request in a global area otherwise will loose it
var ctxRequest;

function showCtxMenu(request, x, y){ 
    ctxRequest = request;
    popUpNew = 1; // mark that we were clicking once
    var ctxMenu = document.getElementById('ctxMenu'); 
    if( ctxMenu ){


        if( ( 'iframe' == request.id )
        ||  ( 'src'    == request.id )
        ) {
            var url = request.innerHTML.replace(/^src=/, ''); // remove 'src='
            url = url.replace(/<b>/g, ''); // remove '<b>'
            url = url.replace(/<\/b>/, ''); // remove '</b>'
            var site = url.replace(/^[a-zA-Z]+:\/\//, ''); // remove protocol
            site = site.replace(/\/.*$/, ''); // remove path and parameters
            site = site.replace(/\?.*$/, ''); // remove parameters
            var domain = site.replace(/^www./, ''); // need to find a better way for this!!!

            ctxMenu.innerHTML =
                '<div class="menu" onclick="clickCtx(this)">ACE Insight</div>'+
                '<div class="menu"><a target="_blank" href="http://aceinsight.websense.com/Results.aspx?url='+url+'">ACE Insight</a></div>'+
                '<div class="menu"><a target="_blank" href="http://www.mywot.com/en/scorecard/'+site+'">myWOT</a></div>'+
                '<div class="menu"><a target="_blank" href="http://www.robtex.com/dns/'+site+'.html#result">robtex</a></div>'+
                '<div class="menu"><a target="_blank" href="http://www.robtex.com/dns/'+domain+'.html#whois">whois</a></div>'+
            '';

            // global context menu settings
            ctxMenu.style.display='block';
            ctxMenu.style.top=y;
            ctxMenu.style.left=x;
        }
        else if ( 'script' == request.id ) {
            var url = request.innerHTML.replace(/^src=/, ''); // remove 'src='
            var site = url.replace(/^[a-zA-Z]+:\/\//, ''); // remove protocol
            site = site.replace(/\/.*$/, ''); // remove path and parameters
            site = site.replace(/\?.*$/, ''); // remove parameters
            var domain = site.replace(/^www./, ''); // need to find a better way for this!!!

            ctxMenu.innerHTML =
                '<div class="menu" onclick="click(this)" id="decode">Decode</div>'+
                '<div class="menu" onclick="click(this)" id="ltrace-this">Behaviour Analysis</div>'+
            '';

            // global context menu settings
            ctxMenu.style.display='block';
            ctxMenu.style.top=y;
            ctxMenu.style.left=x;
        }
        else {
            ctxMenu.style.display='none';
        }

    } 
} 

