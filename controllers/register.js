var express=require('express');
var organModel = require('../models/organization-model');
//var usermodel=require('./../models/user-model');
var router=express.Router();
router.get('/',(req,res)=>{
    res.render('register/index');
});

router.get('/student',(req,res)=>{
    res.render('register/student');
});
router.post('/student',(req,res)=>{
    var user={
                name :req.body.name,
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                conPassword:req.body.confirmpassword
    };
    if(user.password!=user.conPassword)
    {
        console.log('not matched');
        res.redirect('/register/student');
    }
    else{
        
        usermodel.insertintostudent(user,(status)=>{
            if(status) {
                console.log('Successfully Added to Student Table');
                res.redirect('/login');
            }
            else console.log('Failed to insert into student');
        });
    }
});

router.get('/university',(req,res)=>{
    res.render('register/university');
});

router.get('/organization',(req,res)=>{
        res.render('register/organization');
});
router.post('/organization', function(request, response){

	var user = {
        organizationName: request.body.Organizationname,
        organizationCode:request.body.Organizationcode,
        address: request.body.Organizationaddress,
        email:request.body.Emailaddress,
        contact:request.body.Organizationcontact,
		username: request.body.username,
		password: request.body.password,
		confirmpass:request.body.confirmpassword,
		
	};
	
	if(user.password==user.confirmpass)
	{
		organModel.insertOeganizationLogin(user, function(status){
			console.log('or',status);
			if(status){
				response.redirect('/login');
			}else{
				response.redirect('/register/organization');
			}
		});
	}
	else{
		console.log('passward not');
	}
	

	
});
module.exports = router;