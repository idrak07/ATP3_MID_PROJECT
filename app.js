var express=require('express');
var ejs=require('ejs');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var multer=require('multer');
var upload=multer({ dest: '/tmp/' });
var port=500;
var app=express();
var usermodel=require('./models/usermodel');
var register=require('./controllers/register');
var login=require('./controllers/login');
var logout=require('./controllers/logout');
/*var admin=require('./controllers/admin');
var student=require('./controllers/student');
var university=require('./controllers/university')
var oganization=require('./controllers/organization');
*/
var student=require('./controllers/student');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/register',register);
app.use('/logout',logout);
app.use('/login',login);
app.use('/student',student);
/*app.use('/organization',organization);
app.use('/admin',admin);
app.use('/university',university);
*/
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
app.get('/',(req,res)=>{
    res.render('login/loginpage');
});

app.listen(port,()=>{
    console.log('app is running in port: '+port.toString());
});
