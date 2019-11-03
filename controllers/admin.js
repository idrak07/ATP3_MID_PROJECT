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
router.get('/search/byid', function(request, response){

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
router.get('/modifyadmin/am_i/:userid', function(request, response){

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
						response.send('No results');
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

router.get('/modifyadmin/am_i', function(request, response){

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
router.post('/search/byid', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var userid = request.body.id;
				//response.send(userid);
				response.redirect('/admin/modifyadmin/am_i/'+userid);
				
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
module.exports = router;



