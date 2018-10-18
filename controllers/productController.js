const itemProduct=	require('../model/product');
const itemCompany=  require('../model/company');
const itemCategory=  require('../model/category_detail');
const itemProductDetail= require('../model/product_detail');
const productUtil= require('../util/productUtil');

module.exports = {
    
    home : function(req, res){
       //do something
      productUtil.getAllProduct().then(function(result)
      {
        res.json(result);
      }) 	
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
        var company = req.body.company;
        var category = req.body.category;
        var price = req.body.price;

        productUtil.testForCreate(company, category, price).then(function(result)
        {
          if(result===true)
          {
            const newItem=new itemProduct(
            {
              name:names,
              company:company,
              category:category,
              price:price
            });
            newItem.save().then(item=>res.json(item));
          }
          else
            res.json(result);
        })
        
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var names = req.body.name;
        var company = req.body.company;
        var category = req.body.category;
        var price = req.body.price;
        productUtil.testForCreate(company, category, price).then(function(result)
        {
          if(result===true)
          {
            itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "company":company, "category":category, "price":price}}, function(err) {
              if (err)
                  res.send("fail");
              else
                  res.json({ message: 'Offer Updated!'});
            });
          }
          else
            res.json(result);
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
    }

}