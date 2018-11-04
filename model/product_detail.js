const mongoose=require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Định nghĩa schema
const Schema=mongoose.Schema;


//create Schema
const ItemSchema=new Schema(
{
	id:{
		type:Number,
		require:true
	},
	size:{
		type:Number,
		require:true
	},
	color:{
		type:Number,
		require:true
	},
	quantity:{
		type:Number,
		require:true
	},
	is_discount:{
		type:Boolean,
		require:true
	},
	discount_price:{
		type:Number,
		require:true
	},
	summary:{
		type:String
	}
	// with id(product)-id(size)-id(color) we have a product_detail
});
/*
đối với product_detail:
- nếu người dùng có ý định thêm 1 sản phẩm từ 1 công ty+1 category_detail hoàn toàn mới thì người dùng
phải tiến hành thêm các thông tin cơ bản trong product trước rồi sau đó nhấn submit để sang trang
thêm thông tin sản phẩm chi tiết như thêm màu sắc, kích cỡ, số lượng,..
- nếu người dùng có ý định thêm vào 1 sản phẩm mà mã sản phẩm đã tồn tại, người dùng nhấn chọn
vào button thêm sản phẩm trong product
- produc_detail có 3 lựa chọn:
+ thêm product_detail mới.
+ chỉnh sửa product_detail
+ thêm số lượng sản phẩm
*/

// Biên dịch mô hình từ schema
module.exports=Item=mongoose.model('tb_product_details', ItemSchema);// change table 

/*
	var mongoose = require('mongoose');

	var Schema = mongoose.Schema,
	    ObjectId = Schema.ObjectId;
	var Schema_Product = new Schema({
	    categoryId  : ObjectId, // a product references a category _id with type ObjectId
	    title       : String,
	    price       : Number
	});
*/
