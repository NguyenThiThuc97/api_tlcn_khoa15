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
	},
	status:{
		type:Boolean,
		default:false
	},
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
	customer:{
		type:Number,
		require:true
	}
});
ItemSchema.plugin(AutoIncrement, {id:'ordersIdAuto',inc_field: 'id'});
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
