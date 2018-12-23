const express = require("express");
const app = express();
const router = express.Router();
var multer = require("multer")

//store image
//customer
var storageCustomer = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'images/customer')
    },
    filename : function (req, file, cb) {
        if(file){
            cb(null, file.originalname)
        }
      }
})
var uploadCustomer = multer({ storage: storageCustomer })

//employee
var storageEmployee = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'images/employee')
    },
    filename : function (req, file, cb) {
        if(file){
            cb(null, file.originalname)
        }
      }
})
var uploadEmployee = multer({ storage: storageEmployee })

//product
var storageProduct = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'images/product')
    },
    filename : function (req, file, cb) {
        if(file){
            cb(null, file.originalname)
        }
      }
})
var uploadProduct = multer({ storage: storageProduct })

//end stored image
/*1. category*/ 
const category = require('../controllers/categoryController');
//category
router.route('/category').get(category.home);
router.route('/category/:id').get(category.view);
router.route('/category/create').post(category.create);
router.route('/category/update').post(category.update);
router.route('/category/delete/:id').get(category.delete);

/*2. color*/
const color =	require('../controllers/colorController');
router.route('/color').get(color.home);
router.route('/color/:id').get(color.view);
router.route('/color/create').post(color.create);
router.route('/color/update').post(color.update);
router.route('/color/delete/:id').get(color.delete);

/*3. company*/
const company =	require('../controllers/companyController');
router.route('/company').get(company.home);
router.route('/company/:id').get(company.view);
router.route('/company/create').post(company.create);
router.route('/company/update').post(company.update);
router.route('/company/delete/:id').get(company.delete);

/*4. customer*/
const customer =	require('../controllers/customerController');
router.route('/customer').get(customer.home);
router.route('/customer/:id').get(customer.view);
router.route('/customer/create').post(uploadCustomer.single("image"), customer.create);
// router.route('/customer/create').post(uploadCustomer.single("image"), (req, res) => {
//     console.log(req)
// });
router.route('/customer/update').post(uploadCustomer.single("image"), customer.update);
router.route('/customer/update_pwd').post(customer.update_pwd);
router.route('/customer/delete/:id').get(customer.delete);

/*5. department*/
const department=	require('../controllers/departmentController');
router.route('/department').get(department.home);
router.route('/department/:id').get(department.view);
router.route('/department/create').post(department.create);
router.route('/department/update').post(department.update);
router.route('/department/delete/:id').get(department.delete);

/*6. orders*/
const orders=	require('../controllers/ordersController');
router.route('/orders').get(orders.home);
router.route('/orders/:id').get(orders.view);
router.route('/orders/create').post(orders.create);
router.route('/orders/update').post(orders.update);
router.route('/orders/delete/:id').get(orders.delete);

/*7. product*/
const product=	require('../controllers/productController');
router.route('/product').get(product.home);
router.route('/product/:id').get(product.view);
router.route('/product/create').post(uploadProduct.single("image"), product.create);
router.route('/product/update').post(uploadProduct.single("image"), product.update);
router.route('/product/delete/:id').get(product.deleteProduct);

router.route('/product_detail/create').post(product.createProductDetail);
router.route('/product_detail/update').post(product.updateProductDetail);
router.route('/product_detail/delete/:product_id/:size/:color').get(product.deleteProductDetail);
router.route('/product_detail/view/:product_id/:size/:color').get(product.viewProductDetail);

router.route('/product_category/:category').get(product.getProductCategory);
router.route('/product_age_type/:age_type').get(product.getProductAgeType);

/*8. sale_code*/
const sale_code=	require('../controllers/saleCodeController');
router.route('/sale_code').get(sale_code.home);
router.route('/sale_code/:id').get(sale_code.view);
router.route('/sale_code/create').post(sale_code.create);
router.route('/sale_code/update').post(sale_code.update);
router.route('/sale_code/delete/:id').get(sale_code.delete);


/*10. employee*/
const employee=	require('../controllers/userController');
router.route('/employee').get(employee.home);
router.route('/employee/:id').get(employee.view);
router.route('/employee/create').post(uploadEmployee.single("image"), employee.create);
router.route('/employee/update').post(uploadEmployee.single("image"), employee.update);
router.route('/employee/update_pwd').post(employee.update_pwd);
router.route('/employee/delete/:id').get(employee.delete);


/*12. product_sale*/
const product_sale=	require('../controllers/productSaleController');
router.route('/product_sale').get(product_sale.home);
router.route('/product_sale/:product/:size/:color/:sale_code').get(product_sale.view);
router.route('/product_sale/create').post(product_sale.create);
router.route('/product_sale/update').post(product_sale.update);
router.route('/product_sale/delete/:product/:size/:color/:sale_code').get(product_sale.delete);


// login:
router.route('/login').post(employee.login);

//get product type
router.route('/product_type/:type').get(product.getProductType);

module.exports = router;