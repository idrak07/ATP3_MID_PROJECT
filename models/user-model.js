var db = require('./db')

module.exports = {

	
	validate: function(user, callback){
		var sql ="select * from userlogin where userid=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0){
				console.log(result[0]);
				callback(result[0].status);
			}
			else{
				callback(4);
			}
		});	
	},
	
	
}



