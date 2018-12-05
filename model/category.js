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
	name:{
		type:String,
		required:true
	},
	age_type:{
		type:String,
		required:true
	},
	description:{
		type:Object,
		default:{}
	}
});
ItemSchema.plugin(AutoIncrement, {id:'catIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_categories', ItemSchema);// change table 

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
