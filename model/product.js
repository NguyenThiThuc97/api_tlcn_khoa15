const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema = new Schema(
{
	id:{
		type:Number,
		unique:true
	},
	name:{
		type:String,
		required:true
	},
	alias:{
		type:String,
		required:true,
		unique:true
	},
	company:{
		type:Number,
		required:true,
	},
	category:{
		type:Number,
		required:true,
	},
	image:{
		type:String,
		default:""
	},
	description:{
		type:Object,
		default:{}
	},
	product:{
		type:Object,
		default:[]
	}
});
ItemSchema.plugin(AutoIncrement, {id:'productIdAuto',inc_field: 'id'});
// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_products', ItemSchema);// change table 
