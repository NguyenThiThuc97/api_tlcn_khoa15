const ordersUtil = require("../util/ordersUtil");

module.exports = {
	home:function(req, res)
	{
		ordersUtil.home().then(function(result)
		{
			res.json(result);
		})
	},
	view:function(req, res)
	{
		var id=req.params.id;
		ordersUtil.view(id).then(function(result)
		{
			res.json(result);
		})
	},
	create:function(req, res)
	{
		ordersUtil.save(req).then(result=>
		{
			res.json(result)
		})
	},
	update:function(req, res)
	{
		ordersUtil.save(req).then(result=>
		{
			res.json(result)
		})
	},
	delete:function(req, res)
	{
		ordersUtil.delete(req).then(result=>
		{
			res.json(result)
		})
	}
}