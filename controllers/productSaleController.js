const productSaleUtil = require('../util/productSaleUtil');
const itemProductSale = require('../model/product_sale');
module.exports = {
	create:function(req, res)
	{
		var product_id=req.body.product_id;
		var size=req.body.size;
		var color=req.body.color;
		var sale_code=req.body.sale_code;
		productSaleUtil.testCreateProductSale(product_id, size, color, sale_code).then(function(testCreate)
		{
			if(testCreate===true)
			{
				var newProductSale=new itemProductSale(
				{
					product_id:product_id,
					size:size,
					color:color,
					sale_code:sale_code
				})
				newProductSale.save().then(item=>res.json(item))
			}
			else
				res.json({message:"can not create product sale"})
		})

	},
	update:function(req, res)
	{
		var product_id=req.body.product_id;
		var size=req.body.size;
		var color=req.body.color;
		var sale_code=req.body.sale_code;

		var old_product_id=req.body.old_product_id;
		var old_size=req.body.old_size;
		var old_color=req.body.old_color;
		var old_sale_code=req.body.old_sale_code;

		productSaleUtil.testCreateProductSale(product_id, size, color, sale_code).then(function(testCreate)
		{
			if(testCreate===true)
			{
				itemProductSale.findOneAndUpdate({"product_id":old_product_id, "size":old_size, "color":old_color, "sale_code":old_sale_code }, {"$set":{"product_id":product_id, "size":size, "color":color, "sale_code":sale_code}}, function(err)
				{
					if(err)
						res.json(err);
					else
						res.json("Offer Updated!");
				})
			}
			else
				res.json({message:"can not update product sale"})
		})
	},
	home:function(req, res)
	{
		productSaleUtil.allProducSale().then(function(result)
		{
			res.json(result)
		})
	},
	view:function(req, res)
	{
		var product_id = req.params.product;
		var size = req.params.size;
		var color = req.params.color;
		var sale_code = req.params.sale_code;
		productSaleUtil.OneProducSale(product_id, size, color, sale_code).then(function(result)
		{
			res.json(result);
		})
	},
	delete:function(req, res)
	{
		var product_id = res.params.product_id;
		var size = req.body.size;
		var color = req.body.color;
		var sale_code = req.body.sale_code;
		itemProductSale.findOneAndRemove({"product_id":product_id, "size":size, "color":color, "sale_code":sale_code}, function(err)
		{
			if(err)
				res.json(err);
			else
				res.json("Offer Deleted!");
		})
	}
}