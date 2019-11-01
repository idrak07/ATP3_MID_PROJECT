var express=require('express');
var router=express.Router();
router.get('/',(req,res)=>{
    res.render('register/index');
});

router.get('/student',(req,res)=>{
    res.render('register/student');
});
router.post('/student',(req,res)=>{
    var obj={
                name :req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                conPassword:req.body.confirmpassword
    };
    if(obj.password!=obj.conPassword)
    {
        console.log('not matched');
        res.redirect('/register/student');
    }
    else{

    }
});

router.get('/university',(req,res)=>{
    res.render('register/university');
});

router.get('/organization',(req,res)=>{
    res.render('register/organization');
});
module.exports = router;