const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;

//create Schema
const ItemSchema=new Schema(
{
	product_id:{
		type:Number,
		required:true
	},
	size:{
		type:String,
		required:true
	},
	color:{
		type:Object,
		required:true
	},
	quantity:{
		type:Number,
		required:true
	},
	sale_code:{
		type:String,
		default:0
	}
});

// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_orders_details', ItemSchema);// change table 

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
