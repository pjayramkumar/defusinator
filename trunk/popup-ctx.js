/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

var ctxX = 0;
var ctxY = 0;
var ctxMargin = 50;

function hideCtxMenu(ctxMenu) {
    if ( 0 >= popUpNew-- ) {
        popUpNew = 0; // make sure we are not going negative here!
        ctxMenu.style.display='none';
    } 
}

function onmouseleave(e) { 
    var x = e.pageX;
    var y = e.pageY;
    var ctxMenu = document.getElementById('ctxMenu'); 

    if ( ctxMenu ) {
        // check if we are far away from the context menu
        if ( ( x < ctxX - ctxMargin )
          || ( x > ctxX + ctxMargin + ctxMenu.offsetWidth )
          || ( y < ctxY - ctxMargin )
          || ( y > ctxY + ctxMargin + ctxMenu.offsetHeight ) )
        {
            hideCtxMenu(ctxMenu);
        }
    }
} 

var popUpNew = 0;

function check(e) { 
    var target = (e && e.target) || (event && event.srcElement); 
    var ctxMenu = document.getElementById('ctxMenu'); 
    if ( ( ctxMenu ) && ( target != ctxMenu ) ) {
        hideCtxMenu(ctxMenu);
    } 
} 

// Opening URLs in a separated tab or window
function openURL(url) {
//    alert(url);
    window.open(url,'_blank');
}

// we need the request in a global area otherwise will loose it
var ctxRequest;

function showCtxMenu(request, x, y) { 
    ctxRequest = request;
    popUpNew = 1; // mark that we were clicking once

    ctxX = x;
    ctxY = y;

    var ctxMenu = document.getElementById('ctxMenu'); 
    var logArea = document.getElementById('logArea'); 
    if( logArea && ctxMenu ) {
        // This makes sure CTX menu is dimissing
        document.onclick = check; 
        logArea.onmousemove = onmouseleave; 
        logArea.onscroll = check; 

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
                '<div class="menu" onclick="openURL(\'http://aceinsight.websense.com/Results.aspx?url='+url+'\')">ACE Insight</div>'+
                '<div class="menu" onclick="openURL(\'http://www.mywot.com/en/scorecard/'+site+'\')">myWOT</div>'+
                '<div class="menu" onclick="openURL(\'http://www.robtex.com/dns/'+site+'.html#result\')">robtex</div>'+
                '<div class="menu" onclick="openURL(\'http://whois.domaintools.com/'+domain+'\')">whois</div>'+
            '';

            // global context menu settings
            ctxMenu.style.display = 'block';
            ctxMenu.style.top = y;
            ctxMenu.style.left = x;
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
            ctxMenu.style.display = 'block';
            ctxMenu.style.top = y;
            ctxMenu.style.left = x;
        }
        else {
            ctxMenu.style.display = 'none';
        }

    } 
} 

