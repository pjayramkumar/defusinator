/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// hook fromCharCode()
var fromCharCode_orig = String.fromCharCode;
String.fromCharCode = function(s) {
    var c = '';
    deFusLogState++;
    for ( var i = 0; i < arguments.length; i++ ) {
        c += fromCharCode_orig(arguments[i]);
    }
    res += deFusLog( c );
    return c;
}
    
// hooking alert()
alert = function(s) {
    res += deFusLog( 'alert("' + s + '");' );
}

// hooking eval() function
eval_orig = eval;
eval = function(s) {
    res += deFusLog( 'eval("' + s + '");' );
    
    return eval_orig(s);
}
    
var document_head_appendChild = document.head.appendChild;
document.head.appendChild = function(o) {
    if ( o && o.src ) {
        res += deFusLog('document.head.appendChild.element.src=' + o.src);
    }
    else if ( o && o.innerHTML ) {
        res += deFusLog('document.head.appendChild.element.innerHTML=' + o.innerHTML);
    }
    else {
        res += deFusLog('document.head.appendChild(?)');
    }
    return document_head_appendChild.call(document.head, o);
}

var document_body_appendChild = document.body.appendChild;
document.body.appendChild = function(o) {
    if ( o && o.src ) {
        res += deFusLog('document.body.appendChild.element.src=' + o.src);
    }
    else if ( o && o.innerHTML ) {
        res += deFusLog('document.body.appendChild.element.innerHTML=' + o.innerHTML);
    }
    else {
        res += deFusLog('document.body.appendChild(?)');
    }
    return document_body_appendChild.call(document.body, o);
}

// hooking createElement()
var document_createElement = document.createElement;
document.createElement = function(tag) {
    res += deFusLog( 'document.createElement("' + tag + '");' );

    return document_createElement.call(document, tag);
}

// hooking document.write
var document_write = document.write;
document.write = function(text) {
    res += deFusLog( 'document.write("' + text + '");' );

    // Simulate the original document.write
    //return document_write.call(document, text);
    return document.body.innerHTML += text;
}

// hooking document.writeln
var document_writeln = document.writeln
document.writeln = function(text) {
    // Simulate the original document.writeln
    return document.write(text + '<br>');
}

    
// hooking unescape function
var unescape_orig = this.unescape;
unescape = function(s) {
    var u = unescape_orig(s);
    //deFusLog( "unescape( " + u.replace( /\000/mg, ' ' ) + ");" );
    res += deFusLog( 'unescape( "' + u + '" );' );

    return u;
}

// hook setTimeout()
var setTimeout_orig = window.setTimeout;
window.setTimeout = function(s) {
    res += deFusLog( 'setTimeout(" ' + s + ' ")' );
    // emulating timeout:
    try {
        eval_orig(s);
    }
    catch(e) {
    }
}

// hook onmousemove()
// var document_onmousemove = document.onmousemove;
// document.onmousemove = function(s) {
//     res += deFusLog( 'document.onmousemove(" ' + s + ' ")' );
//     // emulating document.onmousemove:
//     try {
//         eval_orig(s);
//     }
//     catch(e) {
//     }
// }

