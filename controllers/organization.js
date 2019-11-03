var express=require('express');
var router=express.Router();
var organizationmodel=require('../models/organization-model');
router.get('*',(req,res,next)=>{
	if(req.cookies['username']!=null)
	{
		if(req.cookies['userstatus']==3)
		{
			next();
		}
		else
		{
			res.redirect('/logout');
		}
	}
	else
	{
			res.redirect('/login');		
	}

});
router.get('/', function(req, res){
	
res.render('organization/index');		
	
});
router.get('/profile', function(request, response){
		
		console.log('hi',request.cookies['username']);
    organizationmodel.getByUsername(request.cookies['username'],function(results){
			if(request.cookies['username'] != null){
				
				//console.log('orga',results);
				response.render('organization/profile', {users: results});		
			}else{
				response.redirect('/logout');
			}
		});	
});
router.get('/offer', function(request, response){
	
organizationmodel.getAlluniversity(function(results){
		if(request.cookies['username'] != null){
			
			console.log('controlars',results);
			response.render('organization/offer',  {users:results});		
		}else{
			response.redirect('/logout');
		}
	});	
});
router.post('/offer', function(request, response){
		
	user={
		orgname:request.cookies['username'],
		university:request.body.university,
		program:request.body.program,
		number:request.body.number,
		scholarship:request.body.scholarship,
		date:request.body.date,
		
	}
		
	console.log('offer',user);
	
	organizationmodel.insertofferscholarship(user,function(results){
			if(request.cookies['username'] != null){
			
				response.redirect('/organization/offershow');	
			}else{
				response.redirect('/logout');
			}
		});	
	});

	router.get('/offershow', function(request, response){

		organizationmodel.getAllofferscholarship( function(results){
				
			response.render('organization/offershow',  {users:results});
		});
		
	});
	router.get('/updateoffer/:id', function(request, response){

		organizationmodel.getById(request.params.id, function(result){
			console.log('ID',request.params.id);
			response.render('organization/updateprofile', result);
		});
		
	});
router.get('/update/:id', function(request, response){
     //0111ei khan theke///
	organizationmodel.getById(request.params.id, function(result){
		console.log('ID',request.params.id);
		response.render('organization/updateprofile', result);
	});
	
});
router.post('/update/:id', function(request, response){

	var user = {
		orName:request.body.orname,
		address:request.body.address,
		email:request.body.email,
		contact:request.body.contact,
		username: request.body.username,
		password: request.body.password,
		id: request.params.id,
		uid:request.cookies['username'],
	};
	response.cookie('username', user.username);
   console.log('user',user);
	organizationmodel.update(user, function(status){
		console.log(status);
		if(status){
			response.redirect('/organization/profile');
		}else{
			response.redirect('/organization/update/'+request.params.id);
		}
	});
	
});
		

module.exports=router;