const itemProduct=	require('../model/product');
const itemProductDetail= require('../model/product_detail');
const itemCompany=  require('../model/company');
const categoryUtil= require('../util/categoryUtil');
const itemColor = require('../model/color');
const itemCategory = require('../model/category');

module.exports =
{
  saveProduct : function(req)
  {
    var id = req.body.id;
    var names = req.body.name;
    var alias = req.body.alias;
    var company = req.body.company;//company->id
    var category = req.body.category;//category->id
    var description = req.body.description;
    var image = req.file;
    var imageN = ""
        
    if(image){
        imageN = image.originalname
    }

    return module.exports.testInputDataAddProduct(category, company).then(function(testInputData)
    {
      if(testInputData === true)
      {
        if(id)//update
        {
          if(image){
              imageN = image.originalname
          }
          if(imageN.length === 0){//not update
            return itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "alias":alias, "company":company, "category":category, "description":description}}, function(err, result) {
                if (err)
                    return {message:err};
                else
                    return result;
              });
          }
          else{
            return itemProduct.findOneAndUpdate({'id':id}, {"$set":{"name":names, "alias":alias, "company":company, "category":category, "description":description, "image":imageN}}, function(err, result) {
              if (err)
                  return {message:err};
              else
                  return result;
            });
          }
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
            image:imageN,
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
    // var productDetail = req.body.product_detail;
    // var date_received = Date.now
    // productDetail.push(date_received)
    // // productDetail.date_received = Date.now
    // return itemProduct.update({"id": productDetail["product_id"]}, {"$push" : {"product":{"$each":productDetail}}}, {"$upsert":true}, function(err, result)
    //     {
    //       if(err)
    //         res.json(err);
    //       else
    //         res.json(result)
    //     })

    return module.exports.testInputDataAddProductDetail(req.body.product_id, req.body.size, req.body.color).then(testInputDataProductDetail => {//
      
      var id = parseInt(req.body.product_id);//product_id
      var size = req.body.size;
      var color = parseInt(req.body.color);
      var quantity = parseInt(req.body.quantity);
      var price = parseInt(req.body.price); 
      var old_size = req.body.old_size; 
      var old_color = parseInt(req.body.old_color); 
      var date_received = parseInt(req.body.date_received); 
      
      if(testInputDataProductDetail){//size and color not existed in db => create
        
        var productDetail = {
          product_id : id,
          size : size,
          color : color,
          price : price,
          quantity : quantity,
          date_received : new Date()
        }

        if(old_color && old_size){//update with new color and size value 
          
          return itemProduct.findOneAndUpdate({"product" : {$elemMatch : {"product_id" : id, "color" : old_color, "size" : old_size}}}, 
          {$set : {"product.$" : productDetail}}, { upsert: true }).then(function(resultUpdate, err) {
            if(err){
              res.json({message : err, statusUpdate : false})
            }
            else {
              res.json({message : resultUpdate, statusUpdate : true})
            }
            
          })
        }
        else {//create
          return itemProduct.update({"id" : productDetail.product_id}, {$push : {"product" : productDetail}}).then(result => {
            {
                if(result.n == 1 && result.nModified == 1 && result.ok == 1)
                  res.json({message : "create product detail successfull", statusAdd : true})
                else
                  res.json({message : "create product detail fail", statusAdd : false})
            }
            })
        }
      }
      else {
        if(size === old_size && color === old_color){//update (not include size and color)
          var productDetailUpdate  = {
            product_id : id,
            size : size,
            color : color,
            price : price,
            quantity : quantity
          }
  
          if(req.body.date_received){
            productDetailUpdate.date_received = new Date(req.body.date_received)
          }
  
          return itemProduct.findOneAndUpdate({"product" : {$elemMatch : {"product_id" : id, "color" : color, "size" : size}}}, 
            {$set : {"product.$" : productDetailUpdate}}, { upsert: true }).then(function(resultUpdate, err) {
              if(err){
                res.json({message : err, statusUpdate : false})
              }
              else {
                res.json({message : resultUpdate, statusUpdate : true})
              }
              
            })
        }
        else {
          res.json({message : "update product detail fail", statusUpdate : false})
        }
        }
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

  testInputDataAddProduct : function(category, company)
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

  testInputDataAddProductDetail : function(id, new_size,new_color){
    // return Promise.all(iData.map(item=>
    // {
    //   return itemProduct.find({"product.product_id":item["product_id"], "product.size":item["size"], "product.color":item["color"]}, function(err, result)
    //   {
    //     return result;
    //   })
    // })).then(function(result)
    // {
    //   for(var val of result)
    //     if(val===null)
    //       return false;
    //   return true;
    // })
    var product_id = parseInt(id)
    var size = new_size
    var color = parseInt(new_color)
    return itemProduct.findOne({"id" : product_id},{"product" : {$elemMatch : {"product_id" : product_id, "color" : color, "size" : size}}})
                        .then(res => {
                          
                          if(res.product.length === 0){
                            return true
                          }
                          else{
                            return false
                          }
                        })
  },


  home:function()
  {
    return itemProduct.find().lean().then(function(result)
    {
      return Promise.all(result.map(item=>
      {
        var category = item.category;
        var company = item.company;
        return itemCompany.find({"id":company}).then(function(com)
        {
          item.CompanyName = com[0]["name"];
          return itemCategory.find({"id":category}).then(function(cat)
          {
            item.CategoryName = cat[0]["name"]+ " " + cat[0]["age_type"];
            return item;
          })
        })
      })).then(function(result)
      {
        return result;
      }).catch(function(err)
      {
        console.log(err)
        return {message:err}
      })
    })
  },

  view : function(id)
  {
    return itemProduct.find({"id":id}).lean().then(function(result)
    {
      return Promise.all(result.map(item=>
      {
        var category = item.category;
        var company = item.company;
        return itemCompany.find({"id":company}).then(function(com)
        {
          item.CompanyName = com[0]["name"];
          return itemCategory.find({"id":category}).then(function(cat)
          {
            item.CategoryName = cat[0]["name"]+ " " + cat[0]["age_type"];
            return item;
          })
        })
      })).then(function(result)
      {
        return result;
      }).catch(function(err)
      {
        return {message:err}
      })
    })
  },
  getProductType: function(req)//male or female
  {
    var type = req.params.type;
    console.log(type);
    return itemProduct.find().lean().then(function(product)
      {
        return Promise.all(product.map(item=>
        {
          return itemCategory.find({"id":item["category"]}).then(function(cat)
          {
            if(cat[0]["age_type"] === type)
            {
              return module.exports.view(item["id"]).then(function(result)
              {
                return result;
              })
            }
          })
        })).then(function(result)
        {
          return result;
        })
      })
  },


  getProductNewArrival : function(flag)//get limit or not
  {
    if(flag)
    {
      return itemProduct.find().sort({date : -1}).then(function(allProductDetail)
      {
        return allProductDetail.limit(10);
      })
    }
    else
    {
      return itemProduct.find().sort({date : -1}).then(function(allProductDetail)
      {
        return allProductDetail;
      })
    }
    
  },

  viewProductDetail : function(req, res){
    var product_id = parseInt(req.params.product_id)
    var size = req.params.size
    var color = parseInt(req.params.color)
    return itemProduct.findOne({"id" : product_id},{"product" : {$elemMatch : {"product_id" : product_id, "color" : color, "size" : size}}}).then(result =>{
      return result
    })
  },

  storeImageToServer : function(image, location)//object array stored link of image in local
  {
    
  },

  deleteImageFromServer : function(id){
    
  },

  getHotProduct : function()
  {
    
  },

  getProductCategory : function(category)
  {
    return itemProduct.find({"category" : category}).then(res => {
      return res
    })
  },

  getProductAgeType : function(req)
  {
    var age_type = req.params.age_type
    return itemCategory.find({"age_type" : age_type}).then(categories => {
      return Promise.all( categories.map(itemCategory => {
        var category_id = itemCategory.id
        return module.exports.getProductCategory(category_id).then(products => {
          return products
        })
      })).then(result => {
        var allProduct = []
        for(var val of result){
          allProduct = allProduct.concat(val)
        }
        return allProduct
      }).catch(err => {
        console.log(err)
        return {message : err}
      })
    })
  },
  
  getProductAgeTypeHome : function(req){
    return module.exports.getProductAgeType(req).then(result => {
      var results = []
      
      for(var index = 0; index < 3; index++){
        results.push(result[index])
      }
      return results
    })
  },

  getProductName : function(){
    return itemProduct.find({},{name : 1, _id : 0, id : 1}).lean().then(res => {
      var result = null
      result = res.map((item, index) => {
        item.value = item.id
        item.label = item.name
        return item
      })
      return result
    })
  }
}