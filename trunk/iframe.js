/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

var iframeAll = function() {
    ctx = 'iframe';
    // IFRAME
    res = deFusLogHead('iFrame Report');
    var iframes = document.head.getElementsByTagName('iframe');
    for ( var i = 0; i < iframes.length; i++ ) {
        if ( ( null != iframes[i].src ) && ( iframes[i].src != '' ) ) {
            res += deFusLog( iframes[i].src );
        }
        if ( ( null != iframes[i].innerHTML ) && ( iframes[i].innerHTML != '' ) ) {
            res += deFusLog( iframes[i].innerHTML );
        }
    }
    var iframes = document.body.getElementsByTagName('iframe');
    for ( var i = 0; i < iframes.length; i++ ) {
        if ( ( null != iframes[i].src ) && ( iframes[i].src != '' ) ) {
            res += deFusLog( iframes[i].src );
        }
        if ( ( null != iframes[i].innerHTML ) && ( iframes[i].innerHTML != '' ) ) {
            res += deFusLog( iframes[i].innerHTML );
        }
    }
}

