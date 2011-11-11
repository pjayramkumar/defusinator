/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/


function chr8( $1 ) {
    return fromCharCode_orig( parseInt( $1, 8 ) );
}
function chr10( $1 ) {
    return fromCharCode_orig( parseInt( $1, 10 ) );
}
function chr16( $1 ) {
    return fromCharCode_orig( parseInt( $1, 16 ) );
}
function chrUni( $1, $2 ) {
    return fromCharCode_orig( parseInt( $2, 16 ) )
         + fromCharCode_orig( parseInt( $1, 16 ) );
}

// unencoding certain type of obfuscated texts
var decode = function(script) {
    ctx = 'decode';

    for ( var s = ''; s != script; ) {
        s = script;
        if ( script.match( /[0-9a-fA-F]{16}/ ) ) {
            script = script.replace( /([0-9a-fA-F]{2})/g, chr16 );
        }
        // removing text formattings to get a clear text of the script
        script = script.replace( /&#(\d{1,3});/g, chr16 );
        script = script.replace( /%u([0-9a-fA-F]{2})([0-9a-fA-F]{2})/g, chrUni );
        script = script.replace( /(?:\\x)|(?:#)|(?:%)([0-9a-fA-F]{2})/g, chr16 );
        script = script.replace( /(\d{1,3})[ ,;'"\)]/g, chr10 );

    }
    res = deFusLogHead("Decoded Script");

    // put the decoded script into the results
    res += deFusLog(script);
}


