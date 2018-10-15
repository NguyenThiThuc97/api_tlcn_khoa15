const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:ObjectId,
	name:{
		type:String,
		require:true
	},
	percent:{
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
ItemSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_sale_code', ItemSchema);// change table 
