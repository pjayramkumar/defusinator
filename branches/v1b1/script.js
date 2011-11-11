/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// Script Reporter
scriptReport = function( req, scripts ) {
    for ( var i = 0; i < scripts.length; i++ ) {
        if (
             ( ( req == 'script-all' )
            || ( req == 'script-src' ) )
          && ( null != scripts[i].src )
          && ( ''   != scripts[i].src )
        ){
            ctx = 'src';
            res += deFusLog( 'src=' + scripts[i].src );
        }
        if (
             ( ( req == 'script-all' )
            || ( req == 'script-inlined' ) )
          && ( null != scripts[i].innerText )
          && ( ''   != scripts[i].innerText )
        ){
            ctx = 'script';
            res += deFusLog( scripts[i].innerText );
        }
    }
}

