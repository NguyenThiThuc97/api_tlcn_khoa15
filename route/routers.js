const express=require("express");
const app=express();
const router=express.Router();

/*1. category*/ 
const category=	require('../controllers/categoryController');
router.route('/category').get(category.home);//show category_detail
//category
router.route('/category/:id').get(category.viewCat);
router.route('/category/create').post(category.createCat);
router.route('/category/update').post(category.updateCat);
router.route('/category/delete/:id').get(category.deleteCat);
//category_for
router.route('/category_for/:id').get(category.viewCatFor);
router.route('/category_for/create').post(category.createCatFor);
router.route('/category_for/update').post(category.updateCatFor);
router.route('/category_for/delete/:id').get(category.deleteCatFor);
//category_detail
router.route('/category_detail/:id').get(category.viewCatDetail);
router.route('/category_detail/create').post(category.createCatDetail);
router.route('/category_detail/update').post(category.updateCatDetail);
router.route('/category_detail/delete/:id').get(category.deleteCatDetail);

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

// /*4. customer*/
// const customer=	require('../controllers/customerController');
// router.route('/customer').get(customer.home);
// router.route('/customer/:id').get(customer.view);
// router.route('/customer/create').post(customer.create);
// router.route('/customer/update').post(customer.update);
// router.route('/customer/delete/:id').get(customer.delete);

/*5. department*/
const department=	require('../controllers/departmentController');
router.route('/department').get(department.home);
router.route('/department/:id').get(department.view);
router.route('/department/create').post(department.create);
router.route('/department/update').post(department.update);
router.route('/department/delete/:id').get(department.delete);

// /*6. orders*/
// const orders=	require('../controllers/ordersController');
// router.route('/orders').get(orders.home);
// router.route('/orders/:id').get(orders.view);
// router.route('/orders/create').post(orders.create);
// router.route('/orders/update').post(orders.update);
// router.route('/orders/delete/:id').get(orders.delete);

/*7. product*/
const product=	require('../controllers/productController');
router.route('/product').get(product.home);
router.route('/product/:id').get(product.view);// add product_detail to view product_detail
router.route('/product/create').post(product.create);
router.route('/product/update').post(product.update);
router.route('/product/delete/:id').get(product.delete);

/*8. sale_code*/
const sale_code=	require('../controllers/saleCodeController');
router.route('/sale_code').get(sale_code.home);
router.route('/sale_code/:id').get(sale_code.view);
router.route('/sale_code/create').post(sale_code.create);
router.route('/sale_code/update').post(sale_code.update);
router.route('/sale_code/delete/:id').get(sale_code.delete);

/*9. size*/
const size=	require('../controllers/sizeController');
router.route('/size').get(size.home);
router.route('/size/:id').get(size.view);
router.route('/size/create').post(size.create);
router.route('/size/update').post(size.update);
router.route('/size/delete/:id').get(size.delete);

// /*10. user*/
// const user=	require('../controllers/userController');
// router.route('/user').get(user.home);
// router.route('/user/:id').get(user.view);
// router.route('/user/create').post(user.create);
// router.route('/user/update').post(user.update);
// router.route('/user/delete/:id').get(user.delete);


module.exports = router;