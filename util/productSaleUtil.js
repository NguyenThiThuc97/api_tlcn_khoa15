const itemProduct=require('../model/product');
const productUtil=require('../util/productUtil');
const itemSaleCode=require('../model/sale_code');
const itemProductSale=require('../model/product_sale');
module.exports = {
	testCreateProductSale:function(product_id, size, color, sale_code)
	{
		return productUtil.testForCreateProductDetail(product_id, size, color).then(function(testProductDetail)
		{
			if(testProductDetail===true)
			{
				return itemSaleCode.find({"id":sale_code}).count().then(function(countSaleCode)
				{
					if(countSaleCode!==0)
						return itemProductSale.find({"product_id":product_id, "size":size, "color":color, "sale_code":sale_code}).count().then(function(countProductSale)
						{
							if(countProductSale===0)
							{
								return true;
							}
							else
							{
								return {message:"produc sale has already existed"};
							}
						})
					else
						return {message:"sale code is not exist"};
				})
			}
			else
				{message:"product detail is not exist"};
		})
	},
	allProducSale:function()
	{
		return itemProductSale.find().lean().then(function(allSaleCode)
		{
			return Promise.all(allSaleCode.map(item=>
			{
				return productUtil.findProductId(item["product_id"]).then(function(productInfor)
				{
					return itemSaleCode.find({"id":item["sale_code"]}).then(function(saleInfor)
					{
						return {allSaleCode, productInfor, saleInfor};
					})
				})
			}))
		})
	},

	OneProducSale:function(product, size, color, sale_code)
	{
		return itemProductSale.find({"product_id":product, "size":size, "color":color, "sale_code":sale_code}).lean().then(function(allSaleCode)
		{
			return Promise.all(allSaleCode.map(item=>
			{
				return productUtil.findProductId(item["product_id"]).then(function(productInfor)
				{
					return itemSaleCode.find({"id":item["sale_code"]}).then(function(saleInfor)
					{
						return {allSaleCode, productInfor, saleInfor};
					})
				})
			}))
		})
	}
}