const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:Number,
	size:Number,
	color:Number,
	quantity:Number,
	is_discount:Boolean,
	discount_price:Number
	// with id(product)-id(size)-id(color) we have a product_detail
});

// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_product_detail', ItemSchema);// change table 

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
