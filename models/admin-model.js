var db = require('./db')

module.exports = {

	
	getuserbyid: function(userid, callback){
		var sql ="select * from admininfo where userid=? ";

		db.getResults(sql, [userid], function(result){

			if(result.length > 0){
				console.log(result[0]);
				callback(true , result[0]);
			}
			else{
				callback(false, null);
			}
		});	
	},
}



