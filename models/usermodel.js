var db = require('./db')

module.exports = {


	validate: function(user, callback){
        var flag=0;
        var sql ="select * from userlogin where userid='"+user.userid+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				console.log(result[0]);
				callback(true,result[0].status);
			}else{
				callback(false,-1);
			}
		});	
	},
	
}
