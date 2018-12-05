const itemProduct=	require('../model/product');
const itemCompany=  require('../model/company');
const itemProductDetail= require('../model/product_detail');
const productUtil= require('../util/productUtil');

module.exports = {
    
    home : function(req, res){
      productUtil.home().then(function(result)
      {
        res.json(result);
      }) 	
    },
    view : function(req, res){//id=>product_detail
       //do something
      var id = req.params.id;
      productUtil.view(id).then(function(result)
        {
          res.json(result);
        });
    },
    create : function(req, res){

        productUtil.saveProduct(req).then(function(result)
        {
          res.json(result);
        })
        
    },
    createProductDetail:function(req, res)
    {
      productUtil.saveProductDetail(req, res);
    },
    update : function(req, res){//need test
       //do something
        var id = req.body.id;
        var names = req.body.name;
        var company = req.body.company;
        var category = req.body.category;
        var category_for = req.body.category_for;
        var price = req.body.price;
        var description = req.body.description;
        productUtil.testForCreate(company, category, category_for).then(function(result)
        {
          if(result===true)
          {
            itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "company":company, "category":category, "category_for":category_for, "price":price, "description":description}}, function(err) {
              if (err)
                  res.json({message:"fail when update"});
              else
                  res.json({ message: 'Offer Updated!'});
            });
          }
          else
            res.json(result);
        })
        
    },
    updateProductDetail:function(req, res)
    {
      //test for create product_detail
      var id = req.body.id;//product_id
      var old_size = req.body.old_size;
      var old_color = req.body.old_color;
      var new_size = req.body.new_size;
      var new_color = req.body.new_color;
      var quantity = req.body.quantity;
      var summary = req.body.summary; 
      productUtil.testForCreateProductDetail(id, new_size,new_color).then(function(result)
      {
        itemProductDetail.findOneAndUpdate({"id":id, "color":old_color, "size":old_size}, {"$set":{"size":new_size, "color":new_color, "quantity":quantity, "summary":summary}}, function(err)
        {
          if(err)
          {
            res.json({message:"fail when update product detail"});
          }
          else
            res.json({message:"update product detail successfully"});
        })
      })
    },
    deleteProduct : function(req, res){
       //do something
        productUtil.deleteProduct(req).then(function(result)
        {
          res.json(result)
        })
    },
    deleteProductDetail:function(req, res)
    {
      productUtil.deleteProductDetail(req).then(function(result)
      {
        if(result.ok === 1 && result.n !== 0)
                res.json({message:"success"})
            else
              res.json({message: "fail"});
      })
    },
    getProductType: function(req, res)//man or woman
    {
      productUtil.getProductType(req).then(function(result)
      {
        res.json(result);
      })
    }

}