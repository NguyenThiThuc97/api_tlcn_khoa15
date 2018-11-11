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
	full_name:{
		type:String,
		default:""
	},
	phone:{
		type:Number,
		default:""
	},
	mail:{
		type:String,
		default:""
	},
	address:{
		type:String,
		default:""
	}, 
	password:{
		type:String,
		required:true
	},
	image:{
		type:String,
		default:""
	}
});
ItemSchema.plugin(AutoIncrement, {id:'customerIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_customers', ItemSchema);// change table 

/*
	var mongoose = require('mongoose');

	var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;
	var Schema_Product = new Schema({
	    categoryId  : ObjectId, // a product references a category _id with type ObjectId
	    title       : String,
	    price       : Number
	});
*/
