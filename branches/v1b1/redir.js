/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// Redir Reporter
redirReport = function( req, meta ) {
    // console.log('ML: ' + meta.length );
    for ( var i = 0; i < meta.length; i++ ) {
        if ( null != meta[i].getAttribute('http-equiv') )
        {
            // console.log('MHE: ' + meta[i].getAttribute('http-equiv') );
            if ( meta[i].getAttribute('http-equiv').toLowerCase() == 'refresh' ) {
                res += deFusLog( 'http-equiv=' + meta[i].getAttribute('content') );
            }
        }
    }
}

