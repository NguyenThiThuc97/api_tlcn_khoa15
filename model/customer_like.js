const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	customer:Number,
	category_detail:Number
	// category:Number,
	// category_for:Number
	// một khách hàng có nhiều sở thích khác nhau, 1 sở thích có nhiều khách hàng
});

// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_customer_like', ItemSchema);// change table 

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
