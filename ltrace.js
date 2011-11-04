/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// behaviour analysis of a particular script
var ltraceScript = function(script) {
    ctx = 'script';

    // removing text formattings to get a clear text of the script
    script = script.replace(/<b>/g, '');
    script = script.replace(/<\/b>/g, '');
    script = script.replace(/&lt;/g, '<');
    script = script.replace(/&gt;/g, '>');
    script = script.replace(/<br>/g, '\n');
    script = script.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '\t');
    script = script.replace(/&nbsp;/g, ' ');
    script = script.replace(/&amp;/g, '&');

    res = deFusLogHead("Script Activity");

    // execute the script
    try {
        eval_orig(script);
    }
    catch(e) {
    }

    // need for closing off fromCharCode() printing properly!
    res += deFusLog('');
}


// this function searches for scripts and executes them...
triggerScripts = function( scripts ) {
    for ( var i = 0; i < scripts.length; i++ ) {
        if ( null != scripts[i].innerText ) {
            var s = scripts[i].innerText;
            if ( s ) {
                // console.log('EXEC: ' + s);
                try {
                    eval_orig(s);
                }
                catch(e) {
                }
            }
        }
    }
}


