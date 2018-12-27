const ItemEmployee=	require('../model/user');
const ItemCustomer=	require('../model/customer');
const ItemDepartment= require('../model/department');
const multer = require("multer");
const crypto = require('crypto');

const upload = multer({dest : 'image/customer/'})
const path = require("path");

module.exports =
{
	getUser:function()
	{
		return ItemEmployee.find().lean().then(function(listUser)
		{
			return Promise.all(listUser.map(val=>
			{
				return ItemDepartment.findOne({"id":val["department"]}).exec();
			})).then(function(departmentName)
			{
				for(var index in listUser)
				{
					listUser[index].departmentName=departmentName[index]["name"];
				}
				return listUser;

			})

		})
	},
	getOneUser:function(id)
	{
		return ItemEmployee.find({"id":id}).lean().then(function(listUser)
		{
			return Promise.all(listUser.map(val=>
			{
				return ItemDepartment.findOne({"id":val["department"]}).exec();
			})).then(function(departmentName)
			{
				for(var index in listUser)
				{
					listUser[index].departmentName=departmentName[index]["name"];
				}
				return listUser;

			})

		})
	},
	login : function(userType, username, password)//password is not encrypted
	{
		var password_encrypted = crypto.createHmac('sha256', password).update('123').digest('hex');
		
		if(userType.length === 0 || username.length === 0|| password.length === 0)
		{
			return {message:"login fail"};
		}
		else{
			switch (userType){
				case "customer":{
					return ItemCustomer.find({"username":username, "password":password_encrypted}).then(function(result)
					{
						if(result.length === 0)
						{
							return {message:"customer : incorrect username or password"};
						}
						return {user: result[0], statusLogin : true};
					})
				} 
				case "employee":{
					return ItemEmployee.find({"username":username, "password":password_encrypted}).then(function(result)
					{
						
						if(result.length === 0)
						{
							return {message:"eployee : incorrect username or password"};
						}
						return {user: result[0], statusLogin : true};
					})
				}
				default : {
					return {message : "bad result"}
				}
			}

		}
		/*
		 if(userType === "employee")
		{
			
		}
		else if(userType==="customer")
		{
			
		}
		 */
	}
}
