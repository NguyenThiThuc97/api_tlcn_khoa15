const ItemCat=	require('../model/category');
module.exports=
{
	allCategory:function()
	{
		return ItemCat.find().then(function(allCategory)
		{
			return allCategory;
		})
	},
	save:function(req)
	{
		var name=req.body.name;
		var age_type=req.body.age_type;
		var desc=req.body.desc;
		
		if(req.body.id)//update
		{
			return ItemCat.findOneAndUpdate({"id":req.body.id},{"$set":{"name":name, "age_type":age_type, "desc":desc}}, function(err, result)
			{
				if(err)
				{
					return result;
				}
				else
				{
					return {message:err};
				}
			})
			
		}
		else//create
		{
			const newItem=new ItemCat(
			{
				name:name,
				age_type:age_type,
				description:desc
			});
			return newItem.save().then(function(result)
				{
					return result["id"];
				});
		}
	},
	delete:function(req)
	{
		var id=req.params.id;
		return ItemCat.findOneAndRemove({"id":id}, function(err, result)
		{
			if(err)
			{
				return {message:err};
			}
			else
				return result;
		})
	}
}