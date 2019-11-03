var db=require('./../models/db');
var express=require('express');
var router=express.Router();
var userModel=require('./../models/usermodel');
router.get('/',(req,res)=>{
    res.render('login/loginpage');
});

router.post('/', function(request, response){
	
	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(status){
		
		if(status==0){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			response.redirect('/admin');
		}
		else if(status==1){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			response.redirect('/student');
		}
		else if(status==2){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			//response.redirect('/university');
		}
		else if(status==3){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			response.redirect('/organization');
		}
		else{
			//response.send('invalid username/password');	
			response.redirect("/login");	
		}
	});

});

module.exports = router;
