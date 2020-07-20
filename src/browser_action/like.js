function createElement( str ) {
    var frag = document.createDocumentFragment();

    var elem = document.createElement('div');
    elem.innerHTML = str;

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

var beep = (function () {
    var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
    var ctx = new ctxClass();
    return function (duration, type, finishedCallback) {

        duration = +duration;

        // Only 0-4 are valid types.
        type = (type % 5) || 0;

        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }

        var osc = ctx.createOscillator();

        osc.type = type;
        //osc.type = "sine";

        osc.connect(ctx.destination);
        if (osc.noteOn) osc.noteOn(0); // old browsers
        if (osc.start) osc.start(); // new browsers

        setTimeout(function () {
            if (osc.noteOff) osc.noteOff(0); // old browsers
            if (osc.stop) osc.stop(); // new browsers
            finishedCallback();
        }, duration);

    };
})();

function converttomilli(dur,type)
{
    if (type=='sec')
        dur=dur*1000
    else if (type=='min')
        dur=dur*60*1000
    else if (type=='hr')
        dur=dur*60*60*1000
    else if (type=='day')
        dur=dur*24*60*60*1000    
    
    return dur;
    
}


function random_between(interval,interval2)
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    //console.log(rand)
    return rand;
}
function get_links(){
    var links=document.querySelectorAll('[data-testid="like"]');
	var allinks=[]
    var button_links=[]
		for (i = 0; i < links.length; i++) {
				allinks.push(links[i])
				//if(!links[i].classList.contains('sc-button-selected'))
				button_links.push(links[i])
				
			if ( i == links.length-1 || button_links.length==sd_numberofclicks)     
			   return [button_links,allinks];
		}    
}

function deletelinks(links)
{
	for (i = 0; i < links.length; i++) {
		links[i].remove()
	}
}
var sd_min_interval=converttomilli(3,'sec')
var sd_max_interval=converttomilli(7,'sec')
var sd_numberofclicks=1
var sd_no_of_errs=0
var totalcount=0
function click_links(links,deletelinksvar){
	if(links.length==0)
		deletelinks(deletelinksvar)
	for (i = 0; i < links.length; i++) {
		links[i].scrollIntoView();
		links[i].click()
		sd_no_of_errs=0
		if ( i == links.length-1)
		{
			totalcount=totalcount+links.length;
			document.getElementById('igcnt').innerText= totalcount;
			deletelinks(deletelinksvar)
		}
	}
}
function main_func(){
	try{
		if(totalcount>1000)
			{alert('The count per action is reached. The maximum is 15 for free version');return;}
		var mainlinks=get_links()
		var actionlinks=mainlinks[0]
		var deletelinksvar=mainlinks[1]
		//console.log(mainlinks)
		click_links(actionlinks,deletelinksvar)
		setTimeout(function(){return main_func()}, random_between(sd_min_interval,sd_max_interval));
	}
	 catch(e){
		 sd_no_of_errs=sd_no_of_errs+1;
		 window.scrollTo(0,document.body.scrollHeight);
		 //console.log(sd_no_of_errs)
		 if(sd_no_of_errs>=6)
			beep(500, 2, function(){});
		 setTimeout(function(){return main_func()}, random_between(sd_min_interval,sd_max_interval));
	 }
}	

function addcountwidget(){  
	var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    top: 10em;    right: 1em;border-radius: 15px 15px;color:#fff;    background:#506def;    padding: 20px;     width: 90px;    height: 95px;" class="rcorners2"><table><tr><td align="center">Likes</td></tr><tr><td align="center"><span style="font-size: 35px;font-weight: bold;"id="igcnt">0</span></td></tr><tr><td></td></tr></table></div>');
    document.getElementsByTagName("body")[0].appendChild(p_ele2)

}	
var sd_max_clicks_per_action=0
var num_of_clicks=0
function getalljson(type){
try{	
chrome.storage.local.get({sd_options_storage:'{}'}, function(result) {
          var obj=JSON.parse(result.sd_options_storage)
			sd_min_interval=converttomilli(obj['sd_'+type+'_min'],'sec')
			sd_max_interval=converttomilli(obj['sd_'+type+'_max'],'sec')
			sd_numberofclicks=parseInt(obj['sd_'+type+'_rate'])
			if(parseInt(obj['sd_'+type+'_per_action'])<parseInt(Math.PI.toString().substring(4, 6)))
				sd_max_clicks_per_action=parseInt(obj['sd_'+type+'_per_action'])
			else
				sd_max_clicks_per_action=parseInt(Math.PI.toString().substring(4, 6))
			//console.log(sd_min_interval)
			//console.log(sd_max_interval)
			//console.log(sd_numberofclicks)
			//console.log(sd_max_clicks_per_action)
        });	}catch(e){}
}
getalljson('like')
addcountwidget()
setTimeout(function(){return main_func()}, 2000);

