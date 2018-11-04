const ItemCat=	require('../model/category');
const ItemCatFor=	require('../model/category_for');
const ItemCatDetail=	require('../model/category_detail');
module.exports=
{
	getAllCatDetail:function()
	{
		return ItemCatDetail.find().then(function(category_details)
		{
			return Promise.all(category_details.map(val=>
			{
				var category=ItemCat.findOne({"id":val["category"]}).exec();
				return category;
			})).then(function(categorys)
			{
				return Promise.all(category_details.map(val1=>
				{
					return ItemCatFor.findOne({"id":val1["category_for"]}).exec();
				})).then(function(category_fors)
				{
					var category=categorys;
					var category_for=category_fors;
					var category_detail=category_details;
					var result={category_detail, category, category_for};
					// console.log(result["category"]);
					return result;
				})
			}).catch(function(err)
			{
				return err;
			})
		})
	},
	getCatDetail:function(category, category_for)
	{
		return ItemCatDetail.find({"category":category, "category_for":category_for}).then(function(category_details)
		{
			return Promise.all(category_details.map(val=>
			{
				var category=ItemCat.findOne({"id":val["category"]}).exec();
				return category;
			})).then(function(categorys)
			{
				return Promise.all(category_details.map(val1=>
				{
					return ItemCatFor.findOne({"id":val1["category_for"]}).exec();
				})).then(function(category_fors)
				{
					var category=categorys;
					var category_for=category_fors;
					var category_detail=category_details;
					var result={category_detail, category, category_for};
					// console.log(result["category"]);
					return result;
				})
			}).catch(function(err)
			{
				return err;
			})
		})
	},
	testForCreate:function(cat, cat_for)
	{

		//test category is exist
		var test_cate=ItemCat.find({"id":cat});
		return test_cate.count().then((countCate)=>
		{
			if(countCate!==0)
			{
				//test category_for is exist
				var test_cate_for=ItemCatFor.find({"id":cat_for});
				return test_cate_for.count().then((countCateFor)=>
				{
					if(countCateFor!==0)
					{
						var a=ItemCatDetail.find({"category":cat, "category_for":cat_for});
						return a.count().then((count)=>
							{
								if(count!==0)
								{
									return {message: 'category_detail is existed!'};
								}
								else
								{
									return true;
								}
							});						
					}
					else
					{
						return {message: 'category_for is not existed'};
					}
				})

			}
			else
			{
				return {message: 'category is not existed!'};
			}
		});
	}
}