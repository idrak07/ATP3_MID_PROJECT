var db = require('./db')

module.exports = {

	getById: function(id, callback){

			var sql = "select * from student where id="+id;
			db.getResults(sql, function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},

	getByUsername: function(username, callback){
		var sql = "select * from student where username='"+username+"'";
		db.getResults(sql, function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},
validate: function(user, callback){
	var sql ="select * from userlogin where userid=? and password=?";
	db.getResults(sql, [user.username, user.password],(result)=>{

		if(result.length > 0){
			console.log(result[0]);
			callback(result[0].status);
		}
		else{
			callback(4);
		}
	});	
},
	getAll: function(callback){
		var sql = "select * from student";
		
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
	insertintostudent: function(user, callback){
		var sql ="insert into student(name,username,password,phone,email,e1) values('"+user.name+"','"+ user.username+"', '"+user.password+"','"+user.phone+"','"+user.email+"',3)";
		var sql0 ="insert into userlogin(userid,password,status) values('"+user.username+"','"+user.password+"',1)";
		db.execute(sql, function(status){
			if(status){
				db.execute(sql0, function(status){
					callback(status);
				});
			}
		});
	},
	update: function(user, callback){
		var sql ="update student set username='"+ user.username+"', password='"+user.password+"' where id="+user.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from student where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
