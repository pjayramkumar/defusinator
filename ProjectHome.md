_deFusinator_ is a JavaScript de-obfuscation plugin for Chrome browser which helps for security researchers to find and analyze obfuscated malicious JavaScript code in compromised web pages.

### Features ###
  * Displays all iFrames in a page, even the dynamically created ones
  * Displays all the JavaScripts used in the page so then can identify the obfuscated ones as well as the ones hosted on a malicious site
  * De-obfuscates induvidual scripts by just clicking on them
  * Check iFrames and script source pages with few site checkers by clicking on them

<img src='http://defusinator.googlecode.com/files/deFusinator-1.png' alt='Logo' />

From the menu select Script-All to see all script on the page. You might can see an obfuscated script on your page which is a good indicator that is malicious.

<img src='http://defusinator.googlecode.com/files/deFusinator-2.png' alt='Logo' />

Click on the script to run it and see what it does. Usually you will see that it creates a malicious iframe or another script:

<img src='http://defusinator.googlecode.com/files/deFusinator-3.png' alt='Logo' />


### History ###
The origin of the project was my deFus.js code which created a special DOM emulation within SpiderMonkey so that I could de-obfuscate most of the malicious sample I analyze day-by-day. The certain limitation of this was the lack of full DOM implementation and the time needed to grab the targeted JavaScript from a page and push it to this system.

deFusinator was a logical follow up for that project, as Chrome browser gives a full-blown DOM implementation plus I do not need to copy+paste the script from the page source, just point and click the script and see what it does.