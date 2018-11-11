const express=require("express");
const app=express();
const router=express.Router();

/*1. category*/ 
const category=	require('../controllers/categoryController');
//category
router.route('/category').get(category.home);
router.route('/category/:id').get(category.view);
router.route('/category/create').post(category.create);
router.route('/category/update').post(category.update);
router.route('/category/delete/:id').get(category.delete);

/*2. color*/
const color=	require('../controllers/colorController');
router.route('/color').get(color.home);
router.route('/color/:id').get(color.view);
router.route('/color/create').post(color.create);
router.route('/color/update').post(color.update);
router.route('/color/delete/:id').get(color.delete);

/*3. company*/
const company=	require('../controllers/companyController');
router.route('/company').get(company.home);
router.route('/company/:id').get(company.view);
router.route('/company/create').post(company.create);
router.route('/company/update').post(company.update);
router.route('/company/delete/:id').get(company.delete);

/*4. customer*/
const customer=	require('../controllers/customerController');
router.route('/customer/login').post(customer.login);
router.route('/customer').get(customer.home);
router.route('/customer/:id').get(customer.view);
router.route('/customer/create').post(customer.create);
router.route('/customer/update').post(customer.update);
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
router.route('/product/create').post(product.create);
router.route('/product/update').post(product.update);
router.route('/product/delete/:id').get(product.deleteProduct);

router.route('/product_detail/create').post(product.createProductDetail);
router.route('/product_detail/update').post(product.updateProductDetail);
router.route('/product_detail/delete/:product_id/:size/:color').get(product.deleteProductDetail);

/*8. sale_code*/
const sale_code=	require('../controllers/saleCodeController');
router.route('/sale_code').get(sale_code.home);
router.route('/sale_code/:id').get(sale_code.view);
router.route('/sale_code/create').post(sale_code.create);
router.route('/sale_code/update').post(sale_code.update);
router.route('/sale_code/delete/:id').get(sale_code.delete);


/*10. user*/
const user=	require('../controllers/userController');
router.route('/user').get(user.home);
router.route('/user/:id').get(user.view);
router.route('/user/create').post(user.create);
router.route('/user/update').post(user.update);
router.route('/user/delete/:id').get(user.delete);


/*12. product_sale*/
const product_sale=	require('../controllers/productSaleController');
router.route('/product_sale').get(product_sale.home);
router.route('/product_sale/:product/:size/:color/:sale_code').get(product_sale.view);
router.route('/product_sale/create').post(product_sale.create);
router.route('/product_sale/update').post(product_sale.update);
router.route('/product_sale/delete/:product/:size/:color/:sale_code').get(product_sale.delete);

module.exports = router;