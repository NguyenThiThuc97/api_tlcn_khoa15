const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:{
		type:Number,		
		unique:true
	},
	username:{
		type:String,
		required:true
	}, 
	fullname:{
		type:String,
		required:true,
		default:""
	},
	phone:{
		type:Number,
		required:true,
		default:""
	},
	mail:{
		type:String,
		required:true,
		default:""
	},
	address:{
		type:String,
		required:true,
		default:""
	}, 
	password:{
		type:String,
		required:true,
		default:""
	},
	department: {
		type:Number,
		required:true,
		default:""
	},
	image:{
		type:String,
		// required:true,
		default:""
	}
});
ItemSchema.plugin(AutoIncrement, {id:'userIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_users', ItemSchema);// change table 

/*
	var mongoose = required('mongoose');

	var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;
	var Schema_Product = new Schema({
	    categoryId  : ObjectId, // a product references a category _id with type ObjectId
	    title       : String,
	    price       : Number
	});
*/
