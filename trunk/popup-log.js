/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// Creating Log View

function logPrint(s) {
    // Simulate the original document.write
    text = document.createElement();

    s += '<div id="ctx"></div>';

    text.innerHTML = '<div id="log-window"><div id="log-area">' + s + '</div></div>';
    document.body.innerHTML = '';
    document.body.appendChild(text);
    // document.body.style.backgroundColor='yellow';
}
    
