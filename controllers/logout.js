var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
	response.clearCookie('username');
	response.clearCookie('userstatus');
	response.redirect('/login');
});

module.exports = router;