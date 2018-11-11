const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const ItemSchema=new Schema(
{
	product_id:{
		type:Number//productId
		},
	size:{
		type:String
	},
	color:{
		type:Number
	},
	sale_code:{
		type:Number
	}
});
module.exports=Item=mongoose.model('tb_product_sales', ItemSchema);// change table 
