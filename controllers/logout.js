var express = require('express');
var router = express.Router();
router.get('/', function(request, response){
	response.clearCookie('username');
	response.redirect('/login');
});
module.exports = router;