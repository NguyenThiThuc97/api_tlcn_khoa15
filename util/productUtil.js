const itemProduct=	require('../model/product');
const itemCompany=  require('../model/company');
const itemCategory=  require('../model/category_detail');
const itemProductDetail= require('../model/product_detail');
const categoryUtil= require('../util/categoryUtil');

module.exports=
{
	getProduct:function()//array "id" products
	{
		var productId=[];
		var productCategory=[];
		var productCompany=[];
		var productName=[];
		var productPrice=[];
		return itemProduct.find().then(function(result)
		{
			for(var val of result)
			{
				productId.push(val["id"]);
				productCategory.push(val["category"]);
				productCompany.push(val["company"]);
				productName.push(val["name"]);
				productPrice.push(val["price"]);
			}
			var size=productId.length;
			return {productId, productCategory, productCompany, productName, productPrice, size};
		}).catch(function(err)
		{
			return "fail";
		});
	},
	getCompany:function()
	{
		return module.exports.getProduct().then(function(company)
		{
			return Promise.all(company["productCompany"].map(val=>
			{
				return itemCompany.findOne({"id":val}).exec();
			})).then(function(result)
			{
				var arrCompanyName=[];
				for(var val of result)
				{
					arrCompanyName.push(val["name"]);
				}
				return arrCompanyName;
			}).catch(function(err)
			{
				return "fail";
			})
		})
	},
	getCategory:function()//!!!
	{
		return module.exports.getProduct().then(function(category_detail_id)
		{
			return categoryUtil.getAllCatDetail().then(function(category_detail_name)
			{
				var n=category_detail_id["size"];
				var na=category_detail_name.length;
				//convert category_detail_name to array;
				// var category_detail_names = JSON.parse(category_detail_name);
				// console.log(category_detail_name[0]);
				var obj=[];
				for(var i=0;i<n;i++)
				{
					for(var j=0;j<na;j++)
					{
						if(category_detail_id["productCategory"][i]===category_detail_name[j]["id"])
						{
							// obj.push({"id":category_detail_id["productId"][i], "category":{"category":category_detail_name[j]["category"], "category_for":category_detail_name[j]["category_for"]}});
							obj.push({"category":category_detail_name[j]["category"], "category_for":category_detail_name[j]["category_for"]});
						}
					}
				}
				return obj;//product_id, category_name, category_for_name


			})
			
		})
	},
	getAllProduct:function()
	{
		return module.exports.getProduct().then(function(product)
        {
          return module.exports.getCompany().then(function(result)
          {
            return module.exports.getCategory().then(function(result1)
            {
              var n=product["size"];
              var obj=[];
              for(var i=0;i<n;i++)
              {
                obj.push({"id":product["productId"][i], "name":product["productName"][i], "company":result[i], "category":result1[i], "price":product["productPrice"][i]});
              }
              return obj;

            });
          });
        })
	},
	testForCreate:function(company, category, price)
	{
		var test_company=itemCompany.find({"id":company});
		//test company exists
        return test_company.count().then((countCompany)=>
        {
          if(countCompany!==0)
          {
            //test category_for is exist
            var test_cat_detail=itemCategory.find({"id":category});
            return test_cat_detail.count().then((countCatDetail)=>
            {
              if(countCatDetail!==0)
              {
                var a=itemProduct.find({"company":company, "category":category});
                return a.count().then((count)=>
                  {
                    if(count!==0)
                    {
                      // res.json({message: 'record is existed!'});
                      return {message: 'record is existed!'};
                    }
                    else
                    {
                      return true;
                    }
                  });           
              }
              else
              {
                return {message: 'category is not existed'};
              }
            })

          }
          else
          {
            return {message: 'company is not existed!'};
          }
        });

	}
}