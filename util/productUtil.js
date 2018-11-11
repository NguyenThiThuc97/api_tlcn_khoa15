  const itemProduct=	require('../model/product');
const itemProductDetail= require('../model/product_detail');
const itemCompany=  require('../model/company');
const categoryUtil= require('../util/categoryUtil');
const itemColor = require('../model/color');
const itemCategory = require('../model/category');

module.exports =
{
  saveProduct:function(req)
  {
    var id = req.body.id;
    var names = req.body.name;
    var alias = req.body.alias;
    var company = req.body.company;//company->id
    var category = req.body.category;//category->id
    var description = req.body.description;
    var image = req.body.image;

    return module.exports.testInputDataAddProduct(category, company).then(function(testInputData)
    {
      if(testInputData === true)
      {
        if(id)//update
        {
          return itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "alias":alias, "company":company, "category":category, "description":description, "image":image}}, function(err, result) {
              if (err)
                  return {message:err};
              else
                  return result;
            });
        }
        else//create
        {
          const newItem = new itemProduct(
          {
            name:names,
            alias:alias,
            company:company,
            category:category,
            description:description,
            image:image,
          });
          return newItem.save().then(function(result)
          {
            return result;
          });//return a new product
        }
      }
      else
      {
        return {message:testInputData}
      }
    })
  },
  saveProductDetail:function(req, res)//object input "product_detail"
  {
    var productDetail = req.body.product_detail;
    return itemProduct.update({"id": productDetail[0]["product_id"]}, {"$push" : {"product":{"$each":productDetail}}}, {"$upsert":true}, function(err, result)
        {
          if(err)
            res.json(err);
          else
            res.json(result)
        })
  },
  deleteProduct:function(req)
  {
    var id = req.params.id;
    if(id)
    {
      return itemProduct.findOneAndRemove({"id":id}).then(result=>
      {
        return result["id"];
      })
    }
  },
  deleteProductDetail : function(req)
  {
    var product_id = parseInt(req.params.product_id);
    var size = req.params.size;
    var color = parseInt(req.params.color);
    return itemProduct.update({}, {"$pull":{"product":{"color":color, "product_id":product_id, "size":size}}}, { multi: true }, function(err, result)
    {
      return result;
    })
  },
  testInputDataAddProduct:function(category, company)
  {
    return itemCategory.find({"id":category}).count().then(function(countCategory)
    {
      if(countCategory !== 0)
      {
        return itemCompany.find({"id":company}).count().then(function(countCompany)
        {
          if(countCompany !== 0)
            return true;
          else
            return {message:"Company ID is not existed"}
        })
      }
      else
        return {message:"Category is not existed"}
    })
  },
  testInputDataAddProductDetail : function(iData)
  {
    return Promise.all(iData.map(item=>
    {
      return itemProduct.find({"product.product_id":item["product_id"], "product.size":item["size"], "product.color":item["color"]}, function(err, result)
      {
        return result;
      })
    })).then(function(result)
    {
      for(var val of result)
        if(val===null)
          return false;
      return true;
    })
  },
  home:function()
  {
    return itemProduct.find().then(function(result)
    {
      return result;
    })
  },
  view:function(id)
  {
    return itemProduct.findOne({"id":id}).then(function(productInfor)
    {
      return productInfor;
    })
  }
}