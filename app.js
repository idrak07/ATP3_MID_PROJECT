//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var expSession = require('express-session');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var login = require('./controllers/login');
var admin = require('./controllers/admin');
var logout = require('./controllers/logout');
var register  = require ('./controllers/register'); 
var student = require ('./controllers/student');
var organization=require('./controllers/organization');
var app = express();


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expSession({secret:'ScholarShip Portal Secret Values', saveUninitialized:true, resave: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/admin',admin);
app.use('/logout', logout);
app.use('/register',register);
app.use('/student', student);
app.use('/organization',organization);



//ROUTER
app.get('/', function(request, response){
	response.redirect("/login");
});


//SERVER STARTUP
app.listen(500, function(){
	console.log('server started at 500...\nScholarship Portal Is Open Now !');
});