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
		var sql = "select * from student where username=?";
		db.getResults(sql,[username],function(result){
			if(result.length > 0 ){
				console.log('xyz name: '+result[0].name);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},
	validate: function(user, callback){
        var flag=0;
        var sql ="select * from student where username='"+user.username+"' and password='"+user.password+"'";
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
	update: function(user, callback){
		var sql ="update student set username='"+ user.username+"', password='"+user.password+"' where id="+user.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	editname:(user,callback)=>{
		var sql="update student set name=? where username=?";
		db.execute(sql,[user.newname,user.username],(status)=>{
			callback(status);
		});
	},
	
	editemail:(user,callback)=>{
		var sql="update student set email=? where username=?";
		db.execute(sql,[user.newemail,user.username],(status)=>{
			callback(status);
		});
	},

	editphone:(user,callback)=>{
		var sql="update student set phone=? where username=?";
		db.execute(sql,[user.newphone,user.username],(status)=>{
			callback(status);
		});
	},
	editusername:(user,callback)=>{
		var sql="update student set username=? where username=?";
		var sql1="update userlogin set userid=? where userid=?"
		db.execute(sql,[user.newusername,user.username],(status)=>{
			if(status){
				db.execute(sql1,[user.newusername,user.username], function(status){
					callback(status);
				});
			}	
		});
	},

	updatepassword:(user,callback)=>{
		var sql="update student set password=? where username=?";
		var sql1="update userlogin set password=? where userid=?";
		db.execute(sql,[user.newpassword,user.username],(status)=>{
			if(status){
				db.execute(sql1,[user.newpassword,user.username], function(status){
					callback(status);
				});
			}
			});
	},
	delete: function(id, callback){
		var sql = "delete from student where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
