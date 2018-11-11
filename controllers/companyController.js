const Item=	require('../model/company');
module.exports = {

    handleError:function(res, reason, message, code)
    {
      console.log("ERROR: " + reason);
      res.status(code || 500).json({"error": message});
    },
    home : function(req, res){

       //do something
       	Item.find()
		.sort({Date:-1})
		.then(item=>res.json(item))
    },
    view : function(req, res, next){
       //do something
        var id = req.params.id;
        Item.findOne({'id':id}).then(item=>
          {
              res.json(item);
          });
    },
    create : function(req, res){//need test
       //do something
        var names = req.body.name;
        var mails =req.body.mail;
        var phones =req.body.phone;
        var websites =req.body.website;
        var fanpages =req.body.fanpage;
        var addresss =req.body.address;
        const newItem=new Item(
          {
            name:names,
            mail:mails,
            website:websites,
            fanpage:fanpages,
            phone:phones,
            address:addresss
          });
        
        newItem.save().then(item=>res.json(item));
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var name = req.body.name;
        var mail = req.body.mail;
        var phone = req.body.phone;
        var address = req.body.address;
        Item.findOneAndUpdate({'id':id}, {"$set":{"name":name,"mail":mail, "phone":phone, "address":address}}, function(err) {
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