var db=require('./../models/db');
var express=require('express');
var router=express.Router();
var usermodel=require('./../models/usermodel');
router.get('/',(req,res)=>{
    res.render('login/loginpage');
});
router.post('/',(req,res)=>{
    var userobj={
        username: req.body.username,
        password: req.body.password
    }
    usermodel.validate(userobj,(exist,status)=>{
        if(exist)
        {
            res.cookie('username', req.body.username);
            if(status==1)
                res.redirect('/admin');
            else if(status==2)
                res.redirect('/student');
            else if(status==3)
                res.redirect('/university');
            else if(status==3)
                res.redirect('/organization');
            else{}
        }
        else{
            //res.send('invalid username/password');	
            res.redirect('/student');	
		}
    });

    
});

module.exports=router;