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
		type:Number,
		require:true
		//get ID from category_detail		
	},
	price:{
		type:Number,
		require:true
	}
});
ItemSchema.plugin(AutoIncrement, {id:'productIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_products', ItemSchema);// change table 
