var express = require('express');
var db = require('./../models/db');
var adminModel = require('./../models/admin-model');

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
				response.redirect('/admin/search')
				//response.render('admin/adminpanel01');
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
router.get('/search', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.render('admin/search01');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.get('/search/id', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.render('admin/searchbyid');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.get('/search/name', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.render('admin/searchbyname');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.get('/modifyadmin/:userid', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var userid=request.params.userid;
				adminModel.getuserbyid(userid,function(exist , results){
					if(exist){
						var userdetails = results;
						response.render('admin/modifyadmin',userdetails);
					}
					else
					{
						response.redirect('/admin/search');
					}
				})
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.post('/modifyadmin/:userid', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var userid=request.params.userid;
				var user = {
					username: request.body.username,
					salary: request.body.salary,
					email: request.body.email,
					userid:request.params.userid
				};
				adminModel.updateadmindetails(user, function(status){
		
					if(status){
						response.send('updated ');
					}else{
						response.send('something Wrong');
					}
				});
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/namelist/:name', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var name=request.params.name;
				adminModel.getuserbyname(name,function(exist , results){
					if(exist){
						response.render('admin/namelist',{userdetails: results});
						//response.render('admin/namelist',userdetails);
					}
					else
					{
						response.redirect('/admin/search');
					}
				})
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});


router.get('/modifyadmin', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.redirect('/admin');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.post('/search/id', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var userid = request.body.id;
				//response.send(userid);
				response.redirect('/admin/modifyadmin/'+userid);
				
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.post('/search/name', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var name = request.body.name;
				response.redirect('/admin/namelist/'+name);
				//response.send(username);
				//response.redirect('/admin/modifyadmin/am_i/'+userid);
				
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
module.exports = router;



