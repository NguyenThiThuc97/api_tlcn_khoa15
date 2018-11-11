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
	status:{
		type:String,
		default:"Can Update or Delete"
	},
	date_create:{
		type:Date,
		default:Date.now
	},
	user_test:{
		type:Number,
		default:0
	},
	date_test:{
		type:Date,
		default:Date.now
	},
	total:{//send from client
		type:Number,
		default:0
	},
	customer:{
		type:Number,
		required:true
	},
	note:
	{
		type:String,
		default:""
	},
	orders_detail:{
		type:Object,
		default:[]
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
