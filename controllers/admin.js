var express = require('express');
var db = require('./../models/db');

var router = express.Router();

router.get('/', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.render('admin/index');
			}		
			else{
				response.redirect('/logout');
			}
		}
		else{
			response.redirect('/logout');
		}	
});

router.get('/adminpanel', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.send('i am In Admin Panel');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/payment', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.send('i am In Payment Panel');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/modifyscholarship', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.send('i am In modifyscholarship Panel');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});


router.get('/analyse', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.send('i am In analyse Panel');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
module.exports = router;



