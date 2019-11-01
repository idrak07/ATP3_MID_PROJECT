// var db=require('./../models/db');
// var express=require('express');
// var router=express.Router();
// var usermodel=require('./../models/usermodel');
// router.get('/',(req,res)=>{
//     res.render('login/loginpage');
// });
// router.post('/',(req,res)=>{
//     var userobj={
//         username: req.body.username,
//         password: req.body.password
//     }
//     usermodel.validate(userobj,(exist,status)=>{
//         if(exist)
//         {
//             res.cookie('username', req.body.username);
//             if(status==0)
//                 res.redirect('/admin');
//             else if(status==1)
//                 res.redirect('/student');
//             else if(status==2)
//                 res.redirect('/university');
//             else if(status==3)
//                 res.redirect('/organization');
//             else{}
//         }
//         else{
//             //res.redirect('/student');
//             res.send('Invaid Password');	
// 		}
//     });    
// });

// module.exports=router;




//var window = require ('window');
var express = require('express');
//var alert = require('alert-node');
var userModel = require('./../models/usermodel');
var router = express.Router();
//var JSAlert = require("js-alert"); 

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
			//response.redirect('/organization');
		}
		else{
			//JSAlert.alert('invalid username/password');	
			response.redirect("/login");	
		}
	});

});

module.exports = router;


