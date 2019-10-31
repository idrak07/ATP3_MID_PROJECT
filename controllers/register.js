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
module.exports = router;