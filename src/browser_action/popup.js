var objstr='{"sd_follow_min":"3","sd_follow_max":"3","sd_follow_rate":"1","sd_follow_per_action":"100","undefined":"No","sd_unfollow_min":"3","sd_unfollow_max":"3","sd_unfollow_rate":"1","sd_unfollow_per_action":"100","sd_like_min":"3","sd_like_max":"3","sd_like_rate":"1","sd_like_per_action":"100","sd_unlike_min":"3","sd_unlike_max":"3","sd_unlike_rate":"1","sd_unlike_per_action":"100","sd_retweet_min":"3","sd_retweet_max":"3","sd_retweet_rate":"1","sd_retweet_per_action":"100","sd_unretweet_min":"3","sd_unretweet_max":"3","sd_unretweet_rate":"1","sd_unretweet_per_action":"100","follow_non_followers":"No"}';
chrome.storage.local.get({sd_options_storage:''}, function(result) { 
if(result.sd_options_storage=='')
{
 //	alert(objstr)
	chrome.storage.local.set({sd_options_storage: objstr}, function() {});
}
});	

var reload='location.reload();';

function click(e) {
	console.log(e.target.id)
	if(e.target.id=='stop')
	{
		chrome.tabs.executeScript({code: reload});
		return;
	}
 
	 
	else 	
		chrome.tabs.executeScript(null,{file:  'src/browser_action/'+e.target.id + '.js'});
	window.close();
}
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('a');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});			  