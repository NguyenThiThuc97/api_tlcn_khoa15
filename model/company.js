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
	mail:{
		type:String,
		require:true
	},
	phone:{
		type:String,
		require:true
	},
	website:{
		type:String,
		require:true
	},
	fanpage:{
		type:String,
		require:true
	},
	address:{
		type:String,
		require:true
	}
});

ItemSchema.plugin(AutoIncrement, {id:'companyIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_companies', ItemSchema);// change table 
