const ItemCat=	require('../model/category');
const ItemCatFor=	require('../model/category_for');
const ItemCatDetail=	require('../model/category_detail');
const categoryUtil=	require('../util/categoryUtil');
module.exports = 
{
	allCategory:function(req, res)
	{
		ItemCat.find().then(result=>
			res.json(result)
			);
	},
	allCategoryFor:function(req, res)
	{
		ItemCatFor.find().then(result=>
			res.json(result)
			);
	},
	home : function(req, res)
	{
		categoryUtil.getAllCatDetail().then(function(result)
		{
			res.json(result);
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
		var category=req.params.category;
		var category_for=req.params.category_for;
		categoryUtil.getCatDetail(category, category_for).then(function(result)
		{
			res.json(result);
		})
	},
	createCatDetail : function(req, res)
	{
		var cat=req.body.category;
		var cat_for=req.body.category_for;
		categoryUtil.testForCreate(cat, cat_for).then(function(result)
		{
			if(result===true)
			{
				const newItem=new ItemCatDetail(
	            {	
	              	category:cat,
					category_for:cat_for
	            });
	            newItem.save().then(item=>res.json(item));//return a new product
			}
			else
				return res.json(result);
		})

	},

	updateCatDetail : function(req, res)
	{

		var old_cat=req.body.old_cat;
		var old_cat_for=req.body.old_cat_for;
		var new_cat=req.body.new_cat;
		var new_cat_for=req.body.new_cat_for;
		categoryUtil.testForCreate(new_cat, new_cat_for).then(function(result)
		{
			if(result===true)
			{
				ItemCatDetail.findOneAndUpdate({"category":old_cat, "category_for":old_cat_for},{"$set":{"category":new_cat, "category_for":new_cat_for}}, function(err)
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
			else
				res.json(result);
		})
	},
	deleteCatDetail : function(req, res)
	{
		var cat=req.params.category;
		var cat_for=req.params.category_for;
		ItemCatDetail.findOneAndRemove({"category":cat, "category_for":cat_for}, function(err)
		{
			if (err)
                res.send(err);
            else
                res.json({ message: 'Offer Deleted!'});
		})
	},
	
}
