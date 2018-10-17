const Item=	require('../model/sale_code');
module.exports = {

    home : function(req, res){
       //do something
       	Item.find()
		.sort({Date:-1})
		.then(item=>res.json(item))
    },
    view : function(req, res){
       //do something
        var id = req.params.id;
        Item.findOne({'id':id}).then(item=>res.json(item));
        // select({ "name": 1, "_id": 0});
    },
    create : function(req, res){//need test
       //do something
        var names = req.body.name;
        var percents = req.body.percent;
        var quantity_froms = req.body.quantity_from;
        var quantity_tos = req.body.quantity_to;

        const newItem=new Item(
          {
            name:names,
            percent:percents,
            quantity_from:quantity_froms,
            quantity_to:quantity_tos
          });
        
        newItem.save().then(item=>res.json(item));
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var name = req.body.name;
        var percent = req.body.percent;
        var quantity_from = req.body.quantity_from;
        var quantity_to = req.body.quantity_to;
        Item.findOneAndUpdate({'id':id}, {"$set":{"name":name, "percent":percent, "quantity_from":quantity_from, "quantity_to":quantity_to}}, function(err) {
              if (err)
                  res.send("fail");
              else
                  res.json({ message: 'Offer Updated!'});
          });
    },
    delete : function(req, res){
       //do something
        var id = req.params.id;
        Item.findOneAndRemove({'id':id}, function(err) {
              if (err)
                  res.send(err);
              else
                  res.json({ message: 'Offer Deleted!'});
          });
    }

}