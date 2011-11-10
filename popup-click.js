
/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

function defusRequest(reqID, reqParam) {
    chrome.tabs.getSelected(null, function(tab) {
//alert('::'+ reqID + ' :: ' + reqParam);
        chrome.tabs.sendRequest( tab.id, { analyse:reqID, text:reqParam },
            function(response) {
                if ( response.log ) {
                    logPrint( response.log );
                }
                if ( response.iframes ) {
                    logPrint( response.iframes );
                }
                if ( response.redirs ) {
                    logPrint( response.redirs );
                }
                if ( response.scripts ) {
//alert('scripts reponse');
                    logPrint( response.scripts );
                }
                if ( response.decoded ) {
//alert('decoded reponse');
                    logPrint( response.decoded );
                }
                if ( response.ltrace ) {
                    logPrint( response.ltrace );
                }
            }
        );
    });
}

function click(request) {
    if( ( 'iframe' == request.id )
    ||  ( 'script' == request.id )
    ||  ( 'src'    == request.id )
    ) {
        var e = window.event;
        ctx(request, e.pageX, e.pageY);
    }
    else if ( 'about' == request.id ) {
        document.body.innerHTML = '<iframe src="about.html"></iframe>';
    }
    else if ( 'faq' == request.id ) {
        document.body.innerHTML = '<iframe src="faq.html"></iframe>';
    }
    else if ( 'help' == request.id ) {
        document.body.innerHTML = '<iframe src="help.html"></iframe>';
    }
    else if ( ( 'decode' == request.id )
           || ( 'ltrace-this' == request.id )
    ) {
        defusRequest( request.id, ctxRequest.innerHTML);
    }
    else {
        defusRequest( request.id, request.innerHTML);
    }
}

