const category=	require('../model/category');
const category_for= require('../model/category_for');
const category_detail=	require('../model/category_detail');
const color= require('../model/color');
const company=	require('../model/company');
const customer= require('../model/customer');
const department=	require('../model/department');
const orders_detail= require('../model/orders_detail');
const product=	require('../model/product');
const product_detail= require('../model/product_detail');
const product_image= require('../model/product_image');
const sale_code= require('../model/sale_code');
const size= require('../model/size');
const user= require('../model/user');
module.exports = {
	create:function(iData, req, res)
	{
		var oData=[];
		for(var val of iData)
		{
			val=req.body.val;
			oData.val=val;
		}

		return oData;
	}
	update:function(iData, req, res)
	{
		var oData=[];
		for(var val of iData)
		{
			val=req.body.val;
			oData.val=val;
		}
		return oData;
	}
}