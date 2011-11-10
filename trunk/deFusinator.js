/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

var sendResp;

// Listener -- events coming from the popup.html
chrome.extension.onRequest.addListener (
  function( request, sender, sendResponse ) {
    sendResp = sendResponse;
    ctx = 'log'; // reset context
alert('request: ' + request.analyse );

    /////////////// IFRAME REPORT //////////////
    if ( 'iframe-all' == request.analyse ) {
        iframeAll();
        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { iframes: res } );
    }

    /////////////// DECODING A PARTICULAR SCRIPT //////////////
    else if ( 'decode' == request.analyse ) {
        decode( request.text );

        console.log('sendResponse( decoded: ' + res + ')\n');
        sendResponse( { decoded: res } );
    }

    /////////////// SCRTIPT REPORTS /////////////////
    else if ( 'script' == request.analyse.substr(0,6) ) {
        res = deFusLogHead("Script Report");
        scriptReport( request.analyse, document.head.getElementsByTagName('script') );
        scriptReport( request.analyse, document.body.getElementsByTagName('script') );
        console.log('sendResponse( scripts: ' + res + ')\n');
        sendResponse( { scripts: res } );
    }

    /////////////// REDIRECTION REPORTS /////////////////
    else if ( 'meta-http-equiv' == request.analyse ) {
console.log('meta-http-equiv');
        res = deFusLogHead("Redirection Report");
        ctx = 'redir';
        redirReport( request.analyse, document.getElementsByTagName('meta') );
        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { redirs: res } );
    }

    /////////////// BEHAVIOUR ANALYSIS OF A PARTICULAR SCRIPT //////////////
    else if ( 'ltrace-this' == request.analyse ) {
        ltraceScript( request.text );

        // console.log('sendResponse(' + res + ')\n');
        //var t = setTimeout_orig.call( window, "sendResp( { ltrace: res } );", 10000 );
        sendResponse( { ltrace: res } );
    }

    /////////////// BEHAVIOUR ANALYSIS //////////////////
    else if ( 'ltrace' == request.analyse ) {
        // console.log('ltrace');
        // DEBUG
        res = deFusLogHead("Script Activity");
        triggerScripts( document.head.getElementsByTagName('script') );
        triggerScripts( document.body.getElementsByTagName('script') );

        // need for closing off fromCharCode() printing properly!
        res += deFusLog('');

        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { ltrace: res } );
    }
});

