
/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

function click(request) {
    if( ( 'iframe' == request.id )
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
    else {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest( tab.id, { analyse:request.id, text:request.innerHTML },
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
                        logPrint( response.scripts );
                    }
                    if ( response.ltrace ) {
                        logPrint( response.ltrace );
                    }
                }
            );
        });
    }
}

