var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('register/index');
});

router.get('/student',(req,res)=>{
    res.render('register/student');
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
		
	};

	userModel.insert(user, function(status){
		
		if(status){
			response.redirect('/user/userlist');
		}else{
			response.redirect('/user/adduser');
		}
	});
	
});
module.exports = router;