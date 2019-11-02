var express=require('express');
var studentmodel=require('./../models/studentmodel');
var router=express.Router();
//console.log('i m in student controller');
router.get('*',(req,res,next)=>{
	if(req.cookies['username']!=null)
	{
		if(req.cookies['userstatus']==1)
			next();
		else
			res.redirect('/logout');
	}
	else
		res.redirect('/login');

});
router.get('/',(req,res)=>{
    res.render('student/index');
});
router.get('/profile',(req,res)=>{
    var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
		console.log(result.name);
        res.render('student/profile',result);
	});
    
});
router.get('/editprofile/name',(req,res)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
        res.render('student/editname',result);
	});
});
router.post('/editprofile/name',(req,res)=>{
	var user={
		username:req.cookies['username'],
		newname:req.body.name
	}
	studentmodel.editname(user,(updated)=>{
		if(updated){
			console.log('name updated');
			res.redirect('/student/profile');
		}
		else
		{console.log('failed to update name');}
	});
});

router.get('/editprofile/email',(req,res)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
        res.render('student/editemail',result);
	});
});
router.post('/editprofile/email',(req,res)=>{
	var user={
		username:req.cookies['username'],
		newemail:req.body.email
	}
	studentmodel.editemail(user,(updated)=>{
		if(updated){
			console.log('email updated');
			res.redirect('/student/profile');
		}
		else
		{console.log('failed to update email');}
	});
});

router.get('/editprofile/phone',(req,res)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
        res.render('student/editphone',result);
	});
});
router.post('/editprofile/phone',(req,res)=>{
	var user={
		username:req.cookies['username'],
		newphone:req.body.phone
	}
	studentmodel.editphone(user,(updated)=>{
		if(updated){
			console.log('phone updated');
			res.redirect('/student/profile');
		}
		else
		{console.log('failed to update phone');}
	});
});

router.get('/editprofile/username',(req,res)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
        res.render('student/editusername',result);
	});
});
router.post('/editprofile/username',(req,res)=>{
	var user={
		username:req.cookies['username'],
		newusername:req.body.username
	}
	studentmodel.editusername(user,(updated)=>{
		if(updated){
			console.log('username updated');
			res.cookie('username', user.newusername);
			res.redirect('/student/profile');
		}
		else
		{console.log('failed to update username');}
	});
});

router.get('/editprofile/updatepassword',(req,res)=>{
	var loggedin=req.cookies['username'];
    res.render('student/updatepassword');
});
router.post('/editprofile/updatepassword',(req,res)=>{
	var password=req.body.password;
	var confirmpassword=req.body.confirmpassword;
	if(password!=confirmpassword)
	{
		console.log('Password not matched');
		res.redirect('/student/editprofile/updatepassword');
	}
	else{
		var user={
			username:req.cookies['username'],
			newpassword:password
		}
		studentmodel.updatepassword(user,(updated)=>{
			if(updated){
				console.log('password updated');
				res.redirect('/student/profile');
			}
			else
			console.log('failed to update password');
		});
	}

});


module.exports=router;