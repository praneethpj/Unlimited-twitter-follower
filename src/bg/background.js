
//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
  
  
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.cmd == "alert") alert(request.msg);
    }
);


chrome.runtime.onInstalled.addListener(function(details) {
    /* other 'reason's include 'update' */
    if (details.reason == "install") {
        /* If first install, set uninstall URL */
       

		
        /* If Chrome version supports it... */
        if (chrome.runtime.setUninstallURL) {
          //  chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
        }
		 
    }
});
  
//chrome.browserAction.setBadgeText({text:'free'});
  