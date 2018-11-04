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
	name:{
		type:String,
		require:true
	},
	_percent:{
		type:Number,
		require:true
	},
	quantity_from:{
		type:Number,
		require:true
	},
	quantity_to:{
		type:Number,
		require:true
	}
});
ItemSchema.plugin(AutoIncrement, {id:'saleCodeIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_sale_codes', ItemSchema);// change table 
