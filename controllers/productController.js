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
        var obj=[];
        // Item.findOne({'id':id}).then(item=>res.json(item));
        productUtil.getAllProduct().then(function(result)
        {
          for(var i=0;i<result.length;i++)
          {
            if(result["id"]===id)
            {
              obj.push("")
            }
          }
          return obj;
          // productUtil.findProductId()
        }) 
        // select({ "name": 1, "_id": 0});
    },
    create : function(req, res){
       //do something
        var names = req.body.name;
        var company = req.body.company;
        var category = req.body.category;

        productUtil.testForCreate(company, category).then(function(result)
        {
          if(result===true)// can create a new product
          {
            const newItem=new itemProduct(
            {
              name:names,
              company:company,
              category:category
            });
            newItem.save().then(item=>res.json(item));//return a new product
          }
          else
            res.json(result);//result=false;
        })
        
    },
    createProductDetail:function(req, res)
    {
      //test for create product_detail
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var names = req.body.name;
        var company = req.body.company;
        var category = req.body.category;
        productUtil.testForCreate(company, category).then(function(result)
        {
          if(result===true)
          {
            itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "company":company, "category":category}}, function(err) {
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