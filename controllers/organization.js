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
				
				console.log('orga',results);
				response.render('organization/profile', {users: results});		
			}else{
				response.redirect('/logout');
			}
		});	
});


module.exports=router;