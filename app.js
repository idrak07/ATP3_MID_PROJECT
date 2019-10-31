/*
var login=require('./controllers/login');
var logout=require('./controllers/logout');
var member=require('./controllers/member');
var moderator=require('./controllers/moderator');
var admin=require('./controllers/admin');
var usermodel=require('./models/usermodel');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/login',login);
app.use('/member',member);
app.use('/admin',admin);
app.use('/moderator',moderator);
app.use('/logout',logout);
app.get('/',(req,res)=>{
    var loggedinuser=req.cookies['username']
    if(loggedinuser!= null){
        usermodel.getByUsername(loggedinuser,(result)=>{
            if(result.status==1)
                res.redirect('/admin');
            else if(result.status==2)
                res.redirect('/moderator');
            else if(result.status==3)
                res.redirect('/member');
        });
    }
    else{
        res.redirect('/login');
    }
});
*/


var express=require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: '/tmp/' });
var port = 500;
var app=express();
var register=require('./controllers/register');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/register',register);

app.get('/',(req,res)=>{
    res.render('login/loginPage');
});

app.listen(port, ()=>{
    console.log('app is running in port: '+port.toString());
});
