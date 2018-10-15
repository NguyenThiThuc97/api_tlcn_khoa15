const express=require('express');
const router=express.Router();
//Item Model


//COMPANY
const ItemCompany=	require('../../model/company');

//home
router.get('/company/home', (req, res)=>
{
	Item.find()
	.sort({Date:-1})
	.then(item=>res.json(item))
});

//new //not test with form
router.post('/company/new', (req, res)=>
{
	const newItem=new ItemCompany(
		{
			name:"def",
			mail:"a",
			phone:"b",
			address:'c'
		});
	
	newItem.save().then(item=>res.json(item));
});

//update //not test
router.post('/company/update', (req, res)=>
{
	var id = req.body.id;
	var name = req.body.name;
	var mail = req.body.mail;
	var phone = req.body.phone;
	var address = req.body.address;
	ItemCompany.findOneAndUpdate({'id':id}, {"$set":{"name":name,"mail":mail, "phone":phone, "address":address}}, function(err) {
        if (err)
            res.send("fail");
        else
            res.json({ message: 'Offer Updated!'})
    });
	
});


//delete
router.get('/company/delete/:id', (req, res)=>
{
	var id = req.params.id;
	ItemCompany.findOneAndRemove({'id':id}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Offer Deleted!'});
    });
	
});

//view
router.get('/company/find/:id', (req, res)=>
{
	var id = req.params.id;
	ItemCompany.findOne({'id':id}).then(item=>res.json(item));
	
});
/*
	request with parameters:
	route: app.get('/users/:userId/books/:bookId', function (req, res) 
	=>http://localhost:3000/users/34/books/8989
	get: req.params: { "userId": "34", "bookId": "8989" }
	var user = request.params.userId;
	var books = request.params.bookId;
*/

/*
	retrieve POST query parameters:
	1. $ npm install --save body-parser
	2. add: 
		var bodyParser = require('body-parser')
		app.use( bodyParser.json() );       // to support JSON-encoded bodies
		app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		})); 
	3. 
		app.post('/test-page', function(req, res) {
	    var name = req.body.name,
	        color = req.body.color;
	    // ...
});
*/
module.exports=router;