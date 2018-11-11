const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:{
		type:Number,
	},
	name:{
		type:String,
		required:true
	},
	_percent:{
		type:Number,
		required:true
	},
	time_from:{
		type:Date,
		required:true
	},
	time_to:{
		type:Date,
		required:true
	}
});
ItemSchema.plugin(AutoIncrement, {id:'saleCodeIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_sale_codes', ItemSchema);// change table 
