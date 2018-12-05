const ItemCat=	require('../model/category');
const categoryUtil=	require('../util/categoryUtil');
module.exports = 
{
	home : function(req, res)
	{
		categoryUtil.allCategory().then(function(result)
		{
			res.json(result);
		})
	},
	view : function(req, res)
	{
		var id=req.params.id;
		ItemCat.findOne({'id':id}).then(item=>res.json(item));
	},
	create : function(req, res)
	{
		categoryUtil.save(req).then(function(result)
		{
			res.json(result);
		})
	},

	update : function(req, res)
	{
		categoryUtil.save(req).then(function(result)
		{
			res.json(result["id"]);
		})
	},
	delete : function(req, res)
	{
		categoryUtil.delete(req).then(function(result)
		{
			res.json(result);
		})
	}
}
