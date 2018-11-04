const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:{
		type:Number,
		require:true,
		unique:true
	},//orders(id)
	product:{
		type:Number,
		require:true
	},
	size:{
		type:Number,
		require:true
	},
	color:{
		type:Number,
		require:true
	},
	quantity:{
		type:Number,
		require:true
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
