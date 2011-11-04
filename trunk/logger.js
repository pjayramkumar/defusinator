/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

var deFusLogState = 0;

deFusLogHead = function(s) {
    return ( '<H2>deFusinator v0.8 by Tamas Rudnai - ' + s + '</H2><OL>' );
}

deFusLog = function(s) {
//    if ( s && s != '' ) {

        // remove extra whitespaces
        var r = s.replace(/^[ \t\r\n]+/, '');
        r = r.replace(/[ \t\r\n]+&/, '');
    
        // encode special characters
        r = r.replace(/&/g, '&amp;');
        r = r.replace(/</g, '&lt;');
        r = r.replace(/>/g, '&gt;');
        r = r.replace(/[\r\n]/g, '<br>');
        r = r.replace(/ /g, '&nbsp;');
        r = r.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        
        // highlight common obfuscation methods
        r = r.replace(/(eval)/g, '<b>$1</b>');
        r = r.replace(/(unescape)/g, '<b>$1</b>');
        r = r.replace(/(fromCharCode)/g, '<b>$1</b>');
        r = r.replace(/(insertBefore)/g, '<b>$1</b>');
        r = r.replace(/(replaceChild)/g, '<b>$1</b>');
        r = r.replace(/(removeChild)/g, '<b>$1</b>');
        r = r.replace(/(appendChild)/g, '<b>$1</b>');
        r = r.replace(/(cloneNode)/g, '<b>$1</b>');
        r = r.replace(/(write)/g, '<b>$1</b>');
        r = r.replace(/(location)/g, '<b>$1</b>');

        // worth to highlight too
        r = r.replace(/(window)/g, '<b>$1</b>');
        r = r.replace(/(document)/g, '<b>$1</b>');
        r = r.replace(/(head)/g, '<b>$1</b>');
        r = r.replace(/(body)/g, '<b>$1</b>');
        r = r.replace(/(https?:\/\/)/g, '<b>$1</b>');

        switch ( deFusLogState ) {
            case 0:
                if ( r != '' ) {
                    console.log(s);
                    return ( '<LI onclick="click(this)" id="'+ctx+'">' + r + '</LI>' );
                }
                else {
                    return ( '' );
                }
            case 1: // beginning of the fromCharCode
                deFusLogState++;
                console.log( 'fromCharCode: ' + s );
                return ( '<LI onclick="click(this)" id="fromCharCode"><b>fromCharCode</b>( \'' + r );
            case 2: // end of the fromCharCode
                deFusLogState = 0;
                if ( r != '' ) {
                    console.log(s);
                    return ( '\' );</LI><LI onclick="click(this)" id="'+ctx+'">' + r + '</LI>' );
                }
                else {
                    return ( '\' );</LI>' );
                }
            case 3: // continoue of the fromCharCode
                deFusLogState = 2;
                // console.log(s);
                return ( r );
            default:
                deFusLogState = 0;
                // console.log(s);
                return ( '<P>' + r + '</P>' );
        } 
//    }
}

