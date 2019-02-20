module.export = function(password){
	var pass_veri = '';
	for(i = 0; i < password.length; i++){
			if(password.length < 6){
				if (y.search[/0-9/] < 1) {
 				pass_veri += "Your password needs a minimum of six characters.";
				return -1;
			}
			else if(password.length >30){
				pass_veri += "Your password needs a maximum of thirty characters.";
				return -1;
			}
			else if(password.search(/[a-z]/) < 0){
				pass_veri += "Your password needs a lower case letter";
				return -1;
			}
			else if(password.search(/[A-Z]/) < 0){
				pass_veri += "Your password needs a upper case letter";
				return -1;
			}
			else if (password.search(/[0-9]/) < 0) {
   				pass_veri += "Your password needs a number";
   				return -1;
			}else{
				return 1;
			}
	}
	
	return pass_veri;
}
