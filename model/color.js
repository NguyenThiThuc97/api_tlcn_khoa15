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
	}
});
ItemSchema.plugin(AutoIncrement, {id:'colorIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_colors', ItemSchema);// change table 
