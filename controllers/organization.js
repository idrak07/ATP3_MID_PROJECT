var express=require('express');
var router=express.Router();
router.get('/', function(req, res){

	if(req.cookies['username'] != null){
		res.render('organization/index');		
	}else{
		res.redirect('/logout');
	}	
});

module.exports=router;