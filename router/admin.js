const adminController=require('../controllers/admincontroller');
const authController=require('../controllers/auth/auth');
const router=require('express').Router();
router.get('/add-product', adminController.addProductPage);
router.post('/add-product', adminController.addProduct);
router.get('/', adminController.homePage);
// products page
router.get('/products-page',adminController.productPage);
router.get('/update-product/:id',adminController.updateProductPage);
router.post('/update-product', adminController.updateProduct);
router.post('/delete-product', adminController.deleteProduct);
router.get('/sign-up',authController.signUpPage);
router.post('/sign-up',authController.signUp);
router.get('/sign-in', authController.signInPage);
router.post('/sign-in',authController.signIn);
module.exports=router;