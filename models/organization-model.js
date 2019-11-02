var db = require('./db')

module.exports = {

	getById: function(id, callback){

			var sql = "select * from organization where username="+id;
			db.getResults(sql,[], function(result){
			
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},

	getByUsername: function(username, callback){
		var sql = "select * from organization where username='"+username+"'";

		db.getResults(sql, [],function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
},
	validate: function(user, callback){
        var flag=0;
        var sql ="select * from organization where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				console.log(result[0]);
				callback(true,result[0].status);
			}else{
				callback(false,-1);
			}
		});	
	},
	getAll: function(callback){
		var sql = "select * from organization";
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAllContent: function(callback){
		var sql = "select * from content";
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	insertOrg: function(user,callback){
			 
		var sql="INSERT INTO `organization`(`orName`, `orCode`, `address`, `email`, `contact`,`username`, `password`,`status`) VALUES (?,?,?,?,?,?,?,?)";
		//var sql ="insert into organization (orName,orCode,address,email,contact,username,passward) values('"+user.organizationName+"','"+user.organizationCode+"','"+user.address+"','"+user.email+"','"+user.contact+"','"+user.username+"', '"+user.password+"')";
		db.execute(sql,[user.organizationName,user.organizationCode,user.address,user.email,user.contact,user.username,user.password,3], function(status){
			callback(status);
		});
		
	},
	insertOeganizationLogin: function(user, callback){
		var sql1="INSERT INTO `organization`(`orName`, `orCode`, `address`, `email`, `contact`,`username`, `password`,`status`) VALUES (?,?,?,?,?,?,?,?)";
		var sql2= "INSERT INTO `userlogin`(`userid`, `password`, `status`) VALUES (?,?,?)";
		db.execute(sql1,[user.organizationName,user.organizationCode,user.address,user.email,user.contact,user.username,user.password,3], function(status){
			if(status)
			{
				db.execute(sql2,[user.username,user.password,3], function(status){
					callback(status);
				})
			}
			
		});
		
		//var sql1111 ="insert into userlogin (userid,password) values('"+user.username+"', '"+user.password+"')";
		;
		
	},
	update: function(user, callback){
		var sql ="update organization set username='"+ user.username+"', password='"+user.password+"' where id="+user.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from organization where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
