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
        var time_from = new Date(req.body.time_from);
        var time_to = new Date(req.body.time_to);

        const newItem=new Item(
          {
            name:names,
            _percent:percents,
            time_from:time_from,
            time_to:time_to
          });
        
        newItem.save().then(item=>res.json(item));
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var name = req.body.name;
        var percent = req.body.percent;
        var time_from = new Date(req.body.time_from);
        var time_to = new Date(req.body.time_to);
        Item.findOneAndUpdate({'id':id}, {"$set":{"name":name, "_percent":percent, "time_from":time_from, "time_to":time_to}}, function(err) {
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