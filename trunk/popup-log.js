/*************************************************************
* deFusinator - JavaScript de-obfuscator plugin for Chrome
* by Tamas Rudnai, all rights reserved
*************************************************************/

// Creating Log View

function logPrint(s) {
    // Simulate the original document.write
    text = document.createElement();

    // creating an empty context menu window
    s += '<div class="contextMenu" id="ctxMenu"></div>';

    text.innerHTML = '<div class="logWindow"><div class="logArea">' + s + '</div></div>';
    document.body.innerHTML = '';
    document.body.appendChild(text);
    // document.body.style.backgroundColor='yellow';
}
    
