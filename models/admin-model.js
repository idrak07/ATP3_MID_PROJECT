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
	},
	addadmin: function(user, callback){
		var sql ="INSERT INTO `admininfo`(`userid`, `username`, `salary`, `balance`, `email`) VALUES (?,?,?,?,?)";
	
		db.execute(sql, [user.id,user.name, user.salary, user.balance,user.email], function(status){
			callback(status);
		});
	},
	withdrawamount: function(user, callback){
		var sql ="UPDATE `admininfo` SET `balance`=(balance-?) WHERE `userid`=?";
	
		db.execute(sql, [user.withdrawamount,user.userid], function(status){
			callback(status);
		});
	},
	getAdminList: function(callback){
		var sql = "select * from admininfo where pstatus=0";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(true, results);
			}else{
				callback(false ,[]);
			}
		});	
	},
	getpaymentstatus:function(userid, callback){
		var sql = "select pstatus from admininfo where userid=?";
		
		db.getResults(sql, [userid], function(results){
			
			if(results.length > 0){
				console.log(results);
				callback(true, results[0].pstatus);
			}else{
				callback(false ,null);
			}
		});	
	},
	clearpayment: function(userid, callback){
		var sql ="UPDATE `admininfo` SET `balance`=(balance+salary),`pstatus`=1 WHERE `userid`=?";
	
		db.execute(sql, [userid], function(status){
			callback(status);
		});
	}

}



