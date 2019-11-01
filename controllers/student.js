var express=require('express');
var studentmodel=require('./../models/studentmodel');
var router=express.Router();
router.get('*',(req,res,next)=>{
	var loggedin=req.cookies['username'];
	studentmodel.getByUsername(loggedin,(result)=>{
		if( result.status!=1)
			res.redirect('/logout');
		else
			next();
	});
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
module.exports=router;