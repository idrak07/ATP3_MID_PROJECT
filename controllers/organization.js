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
router.get('/university', function(request, response){
	organizationmodel.getAlluniversity(function(results){
		if(request.cookies['username'] != null){
			
			console.log('controlars',results);
			response.render('organization/viewuniversity',  {users:results});		
		}else{
			response.redirect('/logout');
		}
	});	
	
	});
	router.post('/university', function(request, response){
		user={
			university:request.body.university,
		}
		organizationmodel.getAlluniversityoption(user,function(results){
			if(request.cookies['username'] != null){
				
				console.log('controlars',results);
				response.render('organization/detalisuniversity',  {users:results});		
			}else{
				response.redirect('/logout');
			}
		});	
		
		});
router.get('/userlist', function(req, res){
	
	res.render('organization/userindex');		
		
	});
	router.get('/application', function(request, response){

		user={
			orname:request.cookies['username'],
		}
		organizationmodel.getAllapplication(user,function(results){
			if(request.cookies['username'] != null){
				
				response.render('organization/application',{users:results});		
			}else{
				response.redirect('/logout');
			}
		});		
			
		});

		router.get('/approve/:id', function(request, response){

			organizationmodel.getByIdapplicationApprove(request.params.id, function(result){
				console.log('ID',result);
				response.render('organization/applicationapprove',  {users:result});
			});
			
		});
		router.get('/approvestudent/', function(request, response){

			user={
				
				username:request.cookies['username'],
			}
			organizationmodel.getByapprovestudent(user, function(result){
				console.log('ID',result);
				response.render('organization/approvestudent',  {users:result});
			});
			
		});
		router.post('/approvestudent/', function(request, response){

			user={
				id:request.body.id,
				username:request.cookies['username'],
			}
			organizationmodel.searchapprovestudent(user, function(result){
				console.log('ID',result);
				response.render('organization/approvestudent',  {users:result});
			});
			
		});
		router.post('/approve/:id', function(request, response){
			user={
				id:request.body.id,
				name:request.body.name,
				university:request.body.university,
				email:request.body.email,
				contract:request.body.contract,
				program:request.body.program,
				cgpa:request.body.cgpa,
				username:request.cookies['username'],
			}
			console.log('app',user);
			organizationmodel.insertapprovestudent(user, function(status){
				console.log('ID',status);
				if(status)
				{ organizationmodel.deleteapplicationapprove(request.params.id, function(status){
					if(status)
					{
						response.redirect('/organization/approvestudent');
					}
					
				});
                   
				}
				
			});
			
		});
		router.get('/reject/:id', function(request, response){

			organizationmodel.deleteapplicationapprove(request.params.id, function(status){
				if(status)
				{
					response.redirect('/organization/application');
				}
				
			});
			
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
		if(user.orgname==null || user.university==null || user.number=='' ||user.program==null || user.scholarship==null|| user.date=='')
		{
		    console.log('offer null');
			response.redirect('/organization/offer');
		 
		}
	
	else{
		organizationmodel.insertofferscholarship(user,function(results){
			if(request.cookies['username'] != null){
			
				response.redirect('/organization/offershow');	
			}else{
				response.redirect('/logout');
			}
		});	
	}
	
	});

	router.get('/offershow', function(request, response){
          user={
			  orName:request.cookies['username'],
		  }
		organizationmodel.getAllofferscholarship( user,function(results){
				
			response.render('organization/offershow',  {users:results});
		});
		
	});
	router.get('/deleteoffer/:id', function(request, response){

		organizationmodel.delete(request.params.id, function(result){
			console.log('ID',request.params.id);
			response.redirect('/organization/offershow');
		});
		
	});
	router.get('/detailsoffer/:id', function(request, response){

		organizationmodel.getByIdofferscholarship(request.params.id, function(result){
			console.log('ID',result);
			response.render('organization/offerdetails',  {users:result});
		});
		
	});
	router.get('/offersearch', function(request, response){

		user={
			orName:request.cookies['username'],
		}
	  organizationmodel.getAllofferscholarship( user,function(results){
			  
		  response.render('organization/offersearch',  {users:results});
	  });
		
	});
	router.post('/offersearch', function(request, response){

		user={
			orName:request.cookies['username'],
			offerid:request.body.offerid,
		}
	  organizationmodel.getByIdoffer( user,function(results){
			  
		  response.render('organization/offersearch',  {users:results});
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
	if(user.orName=='' || user.address=='' || user.email=='' ||user.contact=='' || user.username==''|| user.password==''||user.id=='')
		{
		    response.redirect('/organization/update/'+request.params.id);
		 
		}
		
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