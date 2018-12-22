const itemOrders = require('../model/orders');
const itemOrdersDetail = require('../model/orders_detail');
const itemEmployee = require('../model/user');
const itemCustomer = require('../model/customer');
const itemProductSale = require('../model/product_sale');
const itemProduct = require('../model/product');
const itemSaleCode = require('../model/sale_code');
const itemColor = require('../model/color');

module.exports = {
	save:function(req)
	{
		var iDataOrdersDetail=req.body.orders_detail;

		var id = req.body.id;
		var status = req.body.status;
		var user_test = req.body.user_test;
		var date_test = req.body.date_test;
		var total = req.body.total;
		var customer = req.body.customer;
		var note = req.body.note;
		if(id)//update orders
		{
			return itemOrders.findOneAndUpdate({"id":id}, {"$set" : {"status":status, "user_test":user_test, "date_test":date_test, "customer":customer, "note":note}}, function(err, result)
			{
				if(err)
				{
					return {message:err}
				}
				else
					return "Offer Updated!"
			})
		}
		else
		{
			var newOrders = new itemOrders(
			{
				total : total,
				customer : customer,
				note : note,
				orders_detail : iDataOrdersDetail
			})
			return newOrders.save().then(result=>
			{
				return result;
			})
		}
	},
	updateOrdersDetail : function(req)
	{
		// var iDataOrdersDetail=req.body.iDataOrdersDetail;
		// return itemOrders.find({"orders_detail.orders_id":iDataOrdersDetail[0]["orders_id"], "orders_detail.product_id":})
	},
	home : function()
	{
		return itemOrders.find().then(result=>
		{
			return result;
		})
	},
	view : function(req)
	{
		var id = req.params.id;
		return itemOrders.find({"id":id}).then(result=>
		{
			return result;
		})
	},
	delete: function(req)
	{
		var id = req.params.id;
		return itemOrders.findOneAndRemove({"id":id}, function(err, result)
		{
			if(err)
				return {message:"error"}
			else
				return result
		})
	}
}