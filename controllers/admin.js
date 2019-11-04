var express = require('express');
var db = require('./../models/db');
var adminModel = require('./../models/admin-model');

var router = express.Router();

router.get('/', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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


router.get('/addadmin', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				response.render('admin/registration') ; 
				//response.render('admin/adminpanel01');
			}		
			else{
				response.redirect('/admin');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/clearpayment', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				adminModel.getAdminList(function(exist, results){
					if(exist){
						var users=results;
						console.log(users);
						response.render('admin/clearpayment',{users}) ;
					}
					else{
						response.send('No Payments Left');
					}

				})
				//response.render('admin/clearpayment') ; 
				//response.render('admin/adminpanel01');
			}		
			else{
				response.redirect('/admin');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/clearpayment/:userid', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var userid=request.params.userid;
				adminModel.getpaymentstatus(userid, function(exist,paymentstatus){
					if(exist){
						
						if(paymentstatus==0){
							adminModel.clearpayment(userid,function(status){
								if(status){
									response.send('Done');
								}
								else
								{
									response.send('Something Went Wrong');
								}
							})
						}
						else{
							response.send('Payment Already Done for this month');
						}
					}
					else{
						response.send('No User By this Id');
					}

				})
				//response.render('admin/clearpayment') ; 
				//response.render('admin/adminpanel01');
			}		
			else{
				response.redirect('/admin');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.post('/addadmin', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0)
			{
				var b =0 ;
				var user={
					id:request.body.userid,
					name:request.body.username,
					salary:request.body.salary,
					email:request.body.email , 
					balance:b
				}
				adminModel.getuserbyid(user.id,function(status,result){
					if(status){
						response.send('User Id Already Taken');
					}
					else
					{
						adminModel.addAdmin(user , function(status){
							if(status){
								response.redirect('/admin/addadmin');
							}
							else{
								response.send('Something Went wrong');
							}

						})
					}
				})
			}		
			else{
				response.redirect('/admin');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.get('/payment', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
			{
				response.redirect('/admin/myaccount');
			}		
			else{
				response.redirect('/logout');
			}
		}else{
			response.redirect('/logout');
		}	
});
router.get('/myaccount', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
			{
				var userid=request.cookies['username'];
				console.log(userid);
				adminModel.getmybalance(userid,function(exist , results){
					if(exist){
						response.render('admin/payment_index',results);
						//response.send(results);
					}
					else
					{
						response.redirect('/admin');
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

router.get('/myaccount/withdraw/:userid', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
			{
				var id=request.params.userid;
				console.log(id);
				adminModel.getmybalance(id,function(exist , results){
					if(exist){
						response.render('admin/withdraw',results);
						//response.send(results);
					}
					else
					{
						response.redirect('/admin');
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


router.post('/myaccount/withdraw/:userid', function(request, response){

		if(request.cookies['username'] ==request.params.userid ){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
			{
				 
				var user = {
					withdrawamount: request.body.withdrawamount ,
					userid:request.params.userid
				};
				adminModel.withdrawamount(user, function(status){
					if(status){
						response.redirect('/admin');
					}
					else{
						response.send ('Something Went Wrong :)');
					}

				})
				
			}		
			else{
				response.send('You do not have authority');
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4 )
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
				response.send('You do not have authority');
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
				response.send('You do not have authority');
			}
		}else{
			response.redirect('/logout');
		}	
});

router.get('/namelist/:name', function(request, response){

		if(request.cookies['username'] != null){
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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
			if(request.cookies['userstatus']==0 || request.cookies['userstatus']==4)
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