module.exports = function(password){

	var error = false;
	var pass_veri = '';
	var i = 0;
	for(i = 0; i < password.length; i++){
			if(password.length < 6){
 				pass_veri +="Your password needs a minimum of six characters.";
				error = true;
			}
			else if(password.length > 30){
				pass_veri +="Your password needs a maximum of thirty characters.";
				error = true;
			}
			else if(password.search(/[a-z]/) < 0){
				pass_veri +="Your password needs a lower case letter";
				error = true;
			}
			else if(password.search(/[A-Z]/) < 0){
				pass_veri +="Your password needs a upper case letter";
				error = true;
			}
			else if (password.search(/[0-9]/) < 0) {
   				pass_veri +="Your password needs a number";
   				error = true;
			}else{
				return 1;
			}
			
			if(error){
				return -1;
			}
	}	
}
