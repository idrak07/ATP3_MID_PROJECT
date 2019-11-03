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
	getuserbyname: function(name, callback){

		var sql ="SELECT * FROM `admininfo` WHERE `username` LIKE ?";

		db.getResults(sql,['%'+name+'%'], function(result){
			if(result.length > 0){
				console.log(result);
				callback(true , result);
			}
			else{
				callback(false, null);
			}
		});	
	},
	getmybalance : function(userid, callback){
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
	updateadmindetails: function(user, callback){
		var sql ="UPDATE `admininfo` SET `username`=?,`salary`=?,`email`=? WHERE `userid`=?";
	
		db.execute(sql, [user.username, user.salary, user.email,user.userid], function(status){
			callback(status);
		});
	}
}



