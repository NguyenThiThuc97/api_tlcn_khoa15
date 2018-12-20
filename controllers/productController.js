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
          res.json(result[0]);
        });
    },

    viewProductDetail : function(req, res){//id=>product_detail
      //do something
    
      productUtil.viewProductDetail(req).then(function(result)
      {
        res.json(result.product[0]);
      });
    },

    create : function(req, res){
      
      productUtil.saveProduct(req).then(function(result)
      {
        res.json(result);
      })
        
    },

    update : function(req, res){
      productUtil.saveProduct(req).then(result => {
        res.json(result)
      })
    },

    createProductDetail:function(req, res)
    {
      productUtil.saveProductDetail(req, res);
    },


    updateProductDetail:function(req, res)
    {
      productUtil.saveProductDetail(req, res)
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