const ItemCat=	require('../model/category');
const ItemCatFor=	require('../model/category_for');
const ItemCatDetail=	require('../model/category_detail');
const categoryUtil=	require('../util/categoryUtil');
module.exports = 
{
	home : function(req, res)
	{
		categoryUtil.getAllCatDetail().then(function(result)
		{
			res.json(result);
			// console.log(result.length);
		})
	},
	viewCat : function(req, res)
	{
		var id=req.params.id;
		ItemCat.findOne({'id':id}).then(item=>res.json(item));
	},
	createCat : function(req, res)
	{
		var name=req.body.name;
		var desc=req.body.desc;
		const newItem=new ItemCat(
		{
			name:name,
			description:desc
		});
		newItem.save().then(item=>res.json(item));
	},

	updateCat : function(req, res)
	{
		var name=req.body.name;
		var desc=req.body.desc;
		ItemCat.findOneAndUpdate({"id":id},{"$set":{"name":name, "desc":desc}}, function(err)
		{
			if(err)
			{
				res.send("fail");
			}
			else
			{
				res.json({message: 'Offer Updated!'});
			}
		})
	},
	deleteCat : function(req, res)
	{
		var id=req.params.id;
		//delete category_detail have category=id(category)
		ItemCatDetail.findOneAndRemove({"category":id}, function(err)
		{
			if (err)
                res.send(err);
            else//delete success
                {
                	//delete category
					ItemCat.findOneAndRemove({"id":id}, function(err)
					{
						if (err)
			                res.send(err);
			            else
			                res.json({ message: 'Offer Deleted!'});
					});
                }
		});
	},
	viewCatFor : function(req, res)
	{
		var id=req.params.id;
		ItemCatFor.findOne({'id':id}).then(item=>res.json(item));
	},
	createCatFor : function(req, res)
	{
		var name=req.body.name;
		var desc=req.body.desc;
		const newItem=new ItemCatFor(
		{
			name:name,
			description:desc
		});
		newItem.save().then(item=>res.json(item));

	},

	updateCatFor : function(req, res)
	{
		var name=req.body.name;
		var desc=req.body.desc;
		ItemCatFor.findOneAndUpdate({"id":id},{"$set":{"name":name, "desc":desc}}, function(err)
		{
			if(err)
			{
				res.send("fail");
			}
			else
			{
				res.json({message: 'Offer Updated!'});
			}
		})
	},
	deleteCatFor : function(req, res)
	{
		var id=req.params.id;
		//delete category_detail have category_for=id(category_for)
		ItemCatDetail.findOneAndRemove({"category_for":id}, function(err)
		{
			if (err)
                res.send(err);
            else
                {
                	ItemCatFor.findOneAndRemove({"id":id}, function(err)
					{
						if (err)
			                res.send(err);
			            else
			                res.json({ message: 'Offer Deleted!'});
					})
                }
		});
		
	},
	viewCatDetail : function(req, res)
	{
		var id=req.params.id;
		ItemCatDetail.findOne({'id':id}).then(item=>res.json(item));
	},
	createCatDetail : function(req, res)
	{
		var cat=req.body.cat;
		var cat_for=req.body.cat_for;
		//test category is exist
		var test_cate=ItemCat.find({"id":cat});
		test_cate.count().then((countCate)=>
		{
			if(countCate!==0)
			{
				//test category_for is exist
				var test_cate_for=ItemCatFor.find({"id":cat_for});
				test_cate_for.count().then((countCateFor)=>
				{
					if(countCateFor!==0)
					{
						var a=ItemCatDetail.find({"category":cat, "category_for":cat_for});
						a.count().then((count)=>
							{
								if(count!==0)
								{
									res.json({message: 'record is existed!'});
								}
								else
								{
									const newItem=new ItemCatDetail(
									{
										category:cat,
										category_for:cat_for
									});

									newItem.save().then(item=>res.json(item));
								}
							});						
					}
					else
					{
						res.json({message: 'category_for is not existed'});
					}
				})

			}
			else
			{
				res.json({message: 'category is not existed!'});
			}
		});
		

	},

	updateCatDetail : function(req, res)
	{
		var id=req.body.id;
		var cat=req.body.cat;
		var cat_for=req.body.cat_for;

		var test_cate=ItemCat.find({"id":cat});
		test_cate.count().then((countCate)=>
		{
			if(countCate!==0)
			{
				var test_cate_for=ItemCatFor.find({"id":cat_for});
				test_cate_for.count().then((countCateFor)=>
				{
					if(countCateFor!==0)
					{
						var a=ItemCatDetail.find({"category":cat, "category_for":cat_for});

						a.count().then((count)=>
						{
							if(count!==0)
								{
									res.json({message: 'record is existed!'});
								}
								else
								{
									ItemCatDetail.findOneAndUpdate({"id":id},{"$set":{"category":cat, "category_for":cat_for}}, function(err)
									{
										if(err)
										{
											res.send("fail");
										}
										else
										{
											res.json({message: 'Offer Updated!'});
										}
									})
								}
						});
					}
					else
						res.json({message: 'category_for is not existed'});
				})
			}
			else
				res.json({message: 'category is not existed!'});
		})
		
		
	},
	deleteCatDetail : function(req, res)
	{
		var id=req.params.id;
		ItemCatDetail.findOneAndRemove({"id":id}, function(err)
		{
			if (err)
                res.send(err);
            else
                res.json({ message: 'Offer Deleted!'});
		})
	},
	
}
