const Item=	require('../model/customer');
const crypto = require('crypto');
const userUtil= require('../util/userUtil');
var nodemailer = require('nodemailer');
var multer = require('multer')
var uploadCustomer = multer({dest : "images/customer"})

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
        var username = req.body.username;
        var fullname = req.body.fullname;
        var phone = req.body.phone;
        var mail = req.body.mail;
        var address = req.body.address;
        var password = req.body.password;
        var image = req.file
        var imageN = ""
        
        if(image){
            imageN = image.originalname
        }
        
        var password_encrypt=crypto.createHmac('sha256', password).update('123').digest('hex');

        const newItem=new Item(
          {
            username : username,
            fullname : fullname,
            phone : phone,
            mail : mail,
            address : address,
            password : password_encrypt,
            image : imageN
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
        var image = req.file
        var imageN = ""
        if(image){
            imageN = image.originalname
        }
        if(imageN.length === 0){//not update
            
            Item.findOneAndUpdate({'id':id}, {"$set":{"username":username, "fullname":fullname, "phone":phone, "mail":mail, "address":address}}, function(err) {
                if (err)
                    res.send("fail");
                else
                    res.json({ message: 'Offer Updated!'});
            });
        }
        else{
            
            Item.findOneAndUpdate({'id':id}, {"$set":{"username":username, "fullname":fullname, "phone":phone, "mail":mail, "address":address, "image":imageN}}, function(err) {
                if (err)
                    res.send("fail");
                else
                    res.json({ message: 'Offer Updated!'});
            });
        }
        
    },
    update_pwd:function(req, res){//password is encrypt before to server
      var id = req.body.id;
      var new_pwd = req.body.new_pwd;
      var old_pwd_encrypt = crypto.createHmac('sha256', req.body.old_pwd).update('123').digest('hex');
      var password_encrypt = crypto.createHmac('sha256', new_pwd).update('123').digest('hex');

        Item.findOne({"id" : id}).then(testUpdatePwd => {
            if(testUpdatePwd.password === old_pwd_encrypt){
                Item.findOneAndUpdate({'id':id}, {"$set":{"password":password_encrypt}}, function(err) {
                    if (err)
                        res.json({message : "Update Fail", statusUpdatePwd : false});
                    else
                        res.json({ message: 'Offer Updated!', statusUpdatePwd : true});
                });
            }
            else {
                res.json({message : "Old and new password are not match!!!", statusUpdatePwd : false})
            }
        })
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
    },

    sendMail : function(req, res){
        var name = req.body.customerName
        var mail = req.body.customerMail
        var phone = req.body.customerPhone
        var subject = req.body.subject
        var message = req.body.message
        console.log(name, mail, phone, subject, message)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tuongvuthithuc@gmail.com', // here use your real email
              pass: 'TuongVu25081995' // put your password correctly (not in this question please)
            }
          });

        var mailOptions = {
            from: 'tuongvuthithuc@gmail.com',
            to: 'tuongvuthithuc@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        })
    }    
}