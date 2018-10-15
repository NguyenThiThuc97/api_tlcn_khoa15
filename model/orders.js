const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:ObjectId,
	status:Boolean,
	date_create:{
		type:Date,
		default:Date.now
	},
	user_test:Number,
	date_test:{
		type:Date,
		default:Date.now
	},
	total:Number,
	customer:Number
});
ItemSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_orders', ItemSchema);// change table 

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
