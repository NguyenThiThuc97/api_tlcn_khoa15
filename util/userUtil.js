const ItemEmployee=	require('../model/user');
const ItemCustomer=	require('../model/customer');
const ItemDepartment= require('../model/department');
const path = require("path");
const multer = require("multer");


const upload = multer({dest : 'image/customer/'})

module.exports=
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
	login : function(userType, username, password)//password is encrypt
	{
		if(userType!=="employee"||userType!=="customer"||username.length===0||password.length===0)
		{
			return {message:"login fail"};
		}
		else if(userType==="employee")
		{
			ItemEmployee.find({"username":username, "password":password}).count().then(function(result)
			{
				if(result===0)
				{
					return {message:"incorrect username or password"};
				}
				return true;
			})
		}
		else if(userType==="customer")
		{
			ItemCustomer.find({"username":username, "password":password}).count().then(function(result)
			{
				if(result===0)
				{
					return {message:"incorrect username or password"};
				}
				return true;
			})
		}
	}
}
