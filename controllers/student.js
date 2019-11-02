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
        res.render('student/profile',result);
	});
    
});
router.get('/editprofile',(req,res)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
        res.render('student/editprofile',result);
	});
});
router.post('/editprofile',(req,res)=>{
	
});
module.exports=router;