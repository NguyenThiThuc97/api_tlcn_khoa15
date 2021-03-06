const ItemUser=	require('../model/user');
const ItemDepartment= require('../model/department');
const userUtil= require('../util/userUtil');
const crypto = require('crypto');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

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
            if(result.statusLogin === true)
            {
                var token = jwt.sign({ userType : userType, user : result.user }, 'thucthuc');
                res.json({message:"success", statusLogin: true, token : token});
            }
            else
            {
                res.json({result, statusLogin : false});
            }
        })

    },

    checkUserWithToken : function(req, res){
        
        if(req.body.token){

            var decoded = jwt.verify(token, 'thucthuc');
            // console.log(decoded.user)
            if(decoded.user.username === username)
                {
                    
                }
        }
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
        var image = req.file
        var imageN = ""

        if(image){
          imageN = image.originalname
        }

        var password_encrypted=crypto.createHmac('sha256', password).update('123').digest('hex');

        const newItem=new ItemUser(
          {
            username:username,
            fullname:fullname,
            phone:phone,
            mail:mail,
            address:address,
            password:password_encrypted,
            department:department,
            image:imageN
          });
        
          newItem.save().then((item, err)=> {
            if(!err){
                res.json({message: "success"})
            }
            else{
                res.json({message: "error"})
            }
          });
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
        var image = req.file
        var imageN = ""
        if(image){
            imageN = image.originalname
        }
        if(imageN.length === 0){//not update
            
          ItemUser.findOneAndUpdate({'id':id}, {"$set":{"username":username, "department":department, "fullname":fullname, "phone":phone, "mail":mail, "address":address}}, function(err) {
              if (err)
                  res.send("fail");
              else
                  res.json({ message: 'Offer Updated!'});
          });
        }
        else{

            ItemUser.findOneAndUpdate({'id':id}, {"$set":{"username":username, "department":department, "fullname":fullname, "phone":phone, "mail":mail, "address":address, "image":imageN}}, function(err) {
                if (err)
                    res.send("fail");
                else
                    res.json({ message: 'Offer Updated!'});
            });
        }
    },
    update_pwd:function(req, res){
      var id = req.body.id;
      var pwd = req.body.password;
      var password_encrypted = crypto.createHmac('sha256', pwd).update('123').digest('hex');
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