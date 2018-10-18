const ItemCat=	require('../model/category');
const ItemCatFor=	require('../model/category_for');
const ItemCatDetail=	require('../model/category_detail');
module.exports=
{
	getCatDetail:function()
	{
		var catDetailId=[];
		var catNameId=[];
		var catNameForId=[];
		return ItemCatDetail.find().then(function(result)
		{
			for(var val of result)
			{
				catNameId.push(val["category"]);
				catNameForId.push(val["category_for"]);
				catDetailId.push(val["id"]);
			}
			var size=catNameId.length;
			return {catNameId, catNameForId, catDetailId, size};
		}).catch(function(err)
		{
			return "fail";
		});
	},
	getCatName:function()
	{
		return module.exports.getCatDetail().then(function(catDetail)
		{
			return Promise.all(catDetail["catNameId"].map(val=>
			{
				return ItemCat.findOne({"id":val}).exec();
			})).then(function(result)
			{
				var arrCatName=[];
				for(var val of result)
				{
					arrCatName.push(val["name"]);
				}
				return arrCatName;
			}).catch(function(err)
			{
				return "fail";
			})
		})
	},
	getCatForName:function()
	{
		return module.exports.getCatDetail().then(function(catDetail)
		{
			return Promise.all(catDetail["catNameForId"].map(val=>
			{
				return ItemCatFor.findOne({"id":val}).exec();
			})).then(function(result)
			{
				var arrCatForName=[];
				for(var val of result)
				{
					arrCatForName.push(val["name"]);
				}
				return arrCatForName;
			}).catch(function(err)
			{
				return "fail";
			})
		})
	},
	getAllCatDetail:function()
	{
		return module.exports.getCatDetail().then(function(size)
		{
			return module.exports.getCatName().then(function(result)
			{
				return module.exports.getCatForName().then(function(result1)
				{
					var n=size["size"];
					var obj=[];
					for(var i=0;i<n;i++)
					{
						obj.push({"id":size["catDetailId"][i], "category":result[i], "category_for":result1[i]});
					}
					return obj;
				});
			});
		})
	}
	/*
	categoryUtil.getCatDetail().then(function(size)
		{
			categoryUtil.getCatName().then(function(result)
			{
				categoryUtil.getCatForName().then(function(result1)
				{
					var n=size["size"];
					// var categoryName=[];
					// var categoryForName=[];
					// var catDetailId=size["catDetailId"];
					var obj=[];
					for(var i=0;i<n;i++)
					{
						// console.log(result[i]+" - "+result1[i]);
						obj.push({"id":size["catDetailId"][i], "category":result[i], "category_for":result1[i]});
						// categoryName.push(result[i]);
						// categoryForName.push(result1[i]);
					}
					res.json(obj);
				});
			});
		})
	*/
}