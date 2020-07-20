var follow_non_followers=	'<div class="row">'+
							'    <div class="input-field col s12">'+
							'<span style="font-size:17px;" >Follow only non followers:</span>'+
							  '<div class="input-field inline">'+
												'    <select id="follow_non_followers">'+
												'      <option value="Yes">Yes</option>'+
												'      <option value="No" selected>No</option>'+
												'    </select>'+
							  '</div>							'+
							'    </div>'+
							'</div>';
							
function rendertab(tabname){
	var lowertabname=tabname.toLowerCase();
	var temp_fields
	if(lowertabname=='follow')
		temp_fields=follow_non_followers
	else
		temp_fields=''
	str='<h4>'+tabname+'</h4>'+
	'<div class="row">'+
'    <div class="input-field col s6 ">'+
'      <input value="3" id="sd_'+lowertabname+'_min" type="text" class="validate">'+
'      <label style="font-size:17px;" class="active" for="sd_'+lowertabname+'_min">Minimum Delay(seconds)</label>'+
'    </div>'+
'   <div class="input-field col  s6">'+
'      <input value="3" id="sd_'+lowertabname+'_max" type="text" class="validate">'+
'      <label style="font-size:17px;" class="active" for="sd_'+lowertabname+'_max">Maximum Delay(seconds)</label>'+
'    </div>'+
'</div>'+
'<div class="row">'+
'    <div class="input-field col s6">'+
'      <input value="1" id="sd_'+lowertabname+'_rate" type="text" class="validate">'+
'      <label style="font-size:17px;" class="active" for="sd_'+lowertabname+'_rate">'+tabname+'s per loop</label>'+
'    </div>'+
'    <div class="input-field col s6">'+
'      <input value="100" id="sd_'+lowertabname+'_per_action" type="text" class="validate">'+
'      <label style="font-size:17px;" class="active" for="sd_'+lowertabname+'_per_action">'+tabname+'s per Action</label>'+
'    </div>'+
'</div>'+temp_fields+
'<div class="row">'+
'	<button class="z-depth-4 waves-effect waves-light #ef5350 red lighten-1 btn-large " id="sd_'+lowertabname+'button"class="save">Save</button>'+
'</div>';

return str;
}
function setalljson(){
	var options_obj={}
	$( "input" ).each(function( index ) {
		options_obj[$( this ).attr('id')]=$( this ).val()
	});
	options_obj['follow_non_followers']=$("#follow_non_followers option:selected").text();
	//console.log( options_obj);
	//getalljson(options_obj)
	options_obj_str=JSON.stringify(options_obj);
	console.log(options_obj_str)
	  chrome.storage.local.set({sd_options_storage: options_obj_str}, function() {});
}

function getalljson(){
try{	
chrome.storage.local.get({sd_options_storage:'{}'}, function(result) {
          var obj=JSON.parse(result.sd_options_storage)
			$.each(obj, function( index, value ) {
			  //console.log( index + "== " + value);
			$( "input" ).each(function( index ) {
				$( this ).val(obj[$( this ).attr('id')])
			});	  
			});			  
        $('#follow_non_followers').val(obj['follow_non_followers'])
		
		
		});	
setTimeout(function(){ setalljson();}, 1000);

}
catch(e)
{}
}



$(document).ready(function() {
	$('select').material_select();
});
  
$( ".tab-content" ).each(function( index ) {
	var tabname=$( this ).attr('id');
	$( this ).html(rendertab(tabname));
	//console.log( index + ": " + $( this ).attr('id') );
});

$( "button" ).each(function( index ) {
  	$( this ).on('click',function(){
		setalljson()
	});
});
	
getalljson()

