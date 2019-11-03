var db = require('./db')

module.exports = {

	getById: function(id, callback){

			var sql = "select * from organization where ID="+id;
			db.getResults(sql,[], function(result){
			
				if(result.length > 0 ){
					console.log('getid',result[0]);
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},
	getByIdoffer: function(user, callback){

		var sql = "select * from offerscholarship where orName=? and ID=?"
		db.getResults(sql,[user.orName,user.offerid], function(result){
		
			if(result.length > 0 ){
				console.log('getidoffer',result);
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getByIdofferscholarship: function(id, callback){

		var sql = "select * from offerscholarship where ID="+id;
		db.getResults(sql,[], function(result){
		
			if(result.length > 0 ){
				console.log('getidoffer',result);
				callback(result);
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
	getAllapplication: function(user,callback){
		var sql = "select *from student where orname=?";
		
		db.getResults(sql,[user.orname], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getByIdapplicationApprove: function(id, callback){

		var sql = "select * from student where ID="+id;
		db.getResults(sql,[], function(result){
		
			if(result.length > 0 ){
				console.log('getidoffer',result);
				callback(result);
			}else{
				callback([]);
			}
		});
},
deleteapplicationapprove: function(id, callback){
	var sql = "delete from student where id="+id;
	db.execute(sql,[], function(status){
		callback(status);
	});
},
insertapprovestudent: function(user,callback){
			 
	var sql="INSERT INTO `appovestudent`(`ID`, `name`, `university`, `email`, `number`,`program`, `cgpa`,`username`) VALUES (?,?,?,?,?,?,?,?)";
	
	db.execute(sql,[user.id,user.name,user.university,user.email,user.contract,user.program,user.cgpa,user.username], function(status){
		callback(status);
	});
	
},
getByapprovestudent: function(user, callback){

	var sql = "select * from appovestudent where username=? "
	db.getResults(sql,[user.username], function(result){
	
		if(result.length > 0 ){
			
			callback(result);
		}else{
			callback([]);
		}
	});
},
searchapprovestudent: function(user, callback){

	var sql = "select * from appovestudent where username=? and ID=?"
	db.getResults(sql,[user.username,user.id], function(result){
	
		if(result.length > 0 ){
			console.log('getidoffer',result);
			callback(result);
		}else{
			callback([]);
		}
	});
},
	getAllofferscholarship: function(user,callback){
		var sql = "select * from offerscholarship  where Orname=?";
		
		db.getResults(sql,[user.orName], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAlluniversity: function(callback){
		var sql = "select * from university";
		
		db.getResults(sql,[], function(results){
			console.log('university',results);
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAlluniversityoption: function(user,callback){
		var sql = "select * from university where Name=?";
		
		db.getResults(sql,[user.university], function(results){
			console.log('university',results);
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
	insertofferscholarship: function(user,callback){
			 
		var sql="INSERT INTO `offerscholarship`(`orName`,`university`, `program`, `number`, `scholarship`, `date`) VALUES (?,?,?,?,?,?)";
		//var sql ="insert into organization (orName,orCode,address,email,contact,username,passward) values('"+user.organizationName+"','"+user.organizationCode+"','"+user.address+"','"+user.email+"','"+user.contact+"','"+user.username+"', '"+user.password+"')";
		db.execute(sql,[user.orgname,user.university,user.program,user.number,user.scholarship,user.date], function(status){
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
		var sql ="update organization set orName=?,address=?,email=?,contact=?,username=?, password=? where id=?";
		var sql2 ="update userlogin set userid=?,password=?,status=? where userid=?";
		//var sql2= "INSERT INTO `userlogin`(`userid`, `password`, `status`) VALUES (?,?,?)";
		db.execute(sql, [user.orName,user.address,user.email,user.contact,user.username, user.password, user.id], function(status){
			console.log('log',status);
			if(status)
			{
				db.execute(sql2,[user.username,user.password,3,user.uid], function(status){
					callback(status);
				})
			}
			
		});
	},
	
	delete: function(id, callback){
		var sql = "delete from offerscholarship where id="+id;
		db.execute(sql,[], function(status){
			callback(status);
		});
	}
}
