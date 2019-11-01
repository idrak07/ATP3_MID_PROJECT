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
	
	insertintostudent: function(user, callback){
		var sql="INSERT INTO `student`(`username`, `password`, `email`, `name`, `e1`) VALUES (?,?,?,?,?)";
		//var sql ="insert into student(name,username,password,phone,email,e1) values('"+user.name+"','"+ user.username+"', '"+user.password+"','"+user.phone+"','"+user.email+"',3)";
		var sql0 = "INSERT INTO `userlogin`(`userid`, `password`, `status`) VALUES (?,?,?)";
		//var sql0 ="insert into userlogin(userid,password,status) values('"+user.username+"','"+user.password+"',1)";
		db.execute(sql,[ user.username ,user.password , user.email , user.name , '' ] ,function(status){
			if(status){
				console.log("1 done ");
				db.execute(sql0,[user.username ,user.password ,1] , function(flag){
					console.log("2 done ");
					callback(flag);
				});
			}
		});
	}
}



