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
	company:{
		type:Number,
		require:true
	},
	category:{
		type:Number,//đầm xòe, đầm suông, áo sơ mi cổ đứng, áo sơ mi tay ngắn, áo sơ mi tay dài,...
		require:true
	},
	categogy_for:
	{
		type:Number,
		require:true
	},
	description:{
		tyype:String
	}
});
ItemSchema.plugin(AutoIncrement, {id:'productIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_products', ItemSchema);// change table 
