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
	}
});
ItemSchema.plugin(AutoIncrement, {id:'sizeIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_sizes', ItemSchema);// change table 
