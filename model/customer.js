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
	username:{
		type:String,
		require:true
	}, 
	full_name:{
		type:String,
		require:true
	},
	phone:{
		type:Number,
		require:true
	},
	mail:{
		type:String,
		require:true
	},
	address:{
		type:String,
		require:true
	}, 
	password:{
		type:String,
		require:true
	},
	image:{
		type:String,
		require:true
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
