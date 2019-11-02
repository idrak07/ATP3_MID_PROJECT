var express=require('express');
var usermodel=require('./../models/user-model');
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
module.exports = router;