const ItemUser=	require('../model/user');
const ItemDepartment= require('../model/department');
const userUtil= require('../util/userUtil');
const crypto = require('crypto');

module.exports = {
    home : function(req, res){
      userUtil.getUser().then(function(result)
      {
        // console.log(result);
        res.json(result);
      })
    },
    login:function(req, res)
    {
      var userType = req.body.userType;
      var username = req.body.username;
      var password = req.body.password;
      
      userUtil.login(userType, username, password).then(result => {
        if(result === true)
        {
          res.json({message:"success", statusLogin: true});
        }
        else
        {
          res.json({result, statusLogin : false});
        }
      })

    },
    view : function(req, res){
       //do something
        var id = req.params.id;
        userUtil.getOneUser(id).then(function(result)
        {
          res.json(result);
        })
        // select({ "name": 1, "_id": 0});
    },
    create : function(req, res){//need test
       //do something
        var username = req.body.username;
        var fullname = req.body.fullname;
        var phone = req.body.phone;
        var mail = req.body.mail;
        var address = req.body.address;
        var password = req.body.password;
        var department=req.body.department;
        var image = req.body.image;

        var password_encrypted=crypto.createHmac('sha256', password).update('123').digest('hex');

        const newItem=new Item(
          {
            username:username,
            fullname:fullname,
            phone:phone,
            mail:mail,
            address:address,
            password:password_encrypted,
            department:department,
            image:image
          });
        
        newItem.save().then(item=>res.json(item));
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var username = req.body.username;
        var fullname = req.body.fullname;
        var phone = req.body.phone;
        var mail = req.body.mail;
        var address = req.body.address;
        var department = req.body.department;
        var image = req.body.image;

        Item.findOneAndUpdate({'id':id}, {"$set":{"username":username, "department":department, "fullname":fullname, "phone":phone, "mail":mail, "address":address, "image":image}}, function(err) {
              if (err)
                  res.send("fail");
              else
                  res.json({ message: 'Offer Updated!'});
          });
    },
    update_pwd:function(req, res){
      var id = req.body.id;
      var pwd = req.body.password;
      var password_encrypted = crypto.createHmac('sha256', password).update('123').digest('hex');
      Item.findOneAndUpdate({'id':id}, {"$set":{"password":password_encrypted}}, function(err) {
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