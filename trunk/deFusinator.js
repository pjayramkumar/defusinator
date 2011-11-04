/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/


// Listener -- events coming from the popup.html
chrome.extension.onRequest.addListener (
  function( request, sender, sendResponse ) {
    ctx = 'log'; // reset context
//console.log('request: ' + request.analyse );
    if ( request.analyse == 'about' ) {
      // ABOUT
      res = deFusLogHead('About');
      deFusLogState = -1;
      res += deFusLog( 
          'This plugin was written for helping researchers, security experts and'+
          'site administrators to analyse web pages for injected malicious code.'+
          'With this tool one can see all iFrames, redirections and scripts on the page'+
          'and can analyze what are those elements doing. Ideally it helps to determine the'+
          'malicious activity on the page and reveals the injected code itself.'
      );
      sendResponse( { log: res } );
    }


    /////////////// IFRAME REPORT //////////////
    if ( request.analyse == 'iframe-all' ) {
        iframeAll();
        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { iframes: res } );
    }

    /////////////// BEHAVIOUR ANALYSIS OF A PARTICULAR SCRIPT //////////////
    else if ( request.analyse == 'script' ) {
        ltraceScript( request.text );

        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { ltrace: res } );
    }

    /////////////// SCRTIPT REPORTS /////////////////
    else if ( request.analyse.substr(0,6) == 'script' ) {
        res = deFusLogHead("Script Report");
        scriptReport( request.analyse, document.head.getElementsByTagName('script') );
        scriptReport( request.analyse, document.body.getElementsByTagName('script') );
        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { scripts: res } );
    }

    /////////////// REDIRECTION REPORTS /////////////////
    else if ( request.analyse == 'meta-http-equiv' ) {
console.log('meta-http-equiv');
        res = deFusLogHead("Redirection Report");
        ctx = 'redir';
        redirReport( request.analyse, document.getElementsByTagName('meta') );
        // console.log('sendResponse(' + res + ')\n');
        sendResponse( { redirs: res } );
    }

    /////////////// BEHAVIOUR ANALYSIS //////////////////
    else if ( request.analyse == 'ltrace' ) {
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

