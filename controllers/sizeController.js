const Item=	require('../model/size');
module.exports = {

    home : function(req, res){
       //do something
       	Item.find()
		.sort({Date:-1})
		.then(item=>res.json(item))
    },
    view : function(req, res, id){
       //do something
        var id = req.params.id;
        Item.findOne({'id':id}).then(item=>res.json(item));
        // select({ "name": 1, "_id": 0});
    },
    create : function(req, res){//need test
       //do something
        var names = req.body.name;
        const newItem=new Item(
          {
            name:names
          });
        
        newItem.save().then(item=>res.json(item));
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var name = req.body.name;
        Item.findOneAndUpdate({'id':id}, {"$set":{"name":name}}, function(err) {
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