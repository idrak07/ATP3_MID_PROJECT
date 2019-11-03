var window = require ('window');
var express = require('express');
var alert = require('alert-node');
var userModel = require('./../models/user-model');
var router = express.Router();
router.get('/', function(request, response){
	response.render('login/index');
});

router.post('/', function(request, response){
	
	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(status){
		console.log(status);
		if(status==0 ||status==4 ){
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


