const adminController=require('../controllers/admincontroller');
const authController=require('../controllers/auth/auth');
const isAdmin=require('../middlewares/isAdmin');
const isAuth=require('../middlewares/isAuth');
const {check}=require('express-validator');
const router=require('express').Router();
router.get('/add-product',isAuth,isAdmin, adminController.addProductPage);
router.post('/add-product', adminController.addProduct);
router.get('/', adminController.homePage);
// products page
router.get('/products-page',isAuth,adminController.productPage);
router.get('/update-product/:id',adminController.updateProductPage);
router.post('/update-product', adminController.updateProduct);
router.post('/delete-product', adminController.deleteProduct);
router.get('/sign-up',authController.signUpPage);
router.post('/sign-up',[
    check('Email').notEmpty().withMessage('Field cannot be blank').isEmail().withMessage('Invalid Eamil'),
    check('Phone').notEmpty().withMessage('Field cannot be blank').isNumeric().withMessage('Incorrect phone number'),
    check('Password').notEmpty().withMessage('Field cannot be blank').isLength({min:8}).withMessage('Password must be more than 8 characters'),
    check('Confirm_password').notEmpty().withMessage('Field cannot be blank').custom((value,{req})=>{
        if(value!==req.body.Password){
            throw new Error('The password does not match')
        }
        return true;
    })
],authController.signUp);
router.get('/sign-in', authController.signInPage);
router.post('/sign-in',[
    check('Email').notEmpty().withMessage('Field cannot be blank').isEmail().withMessage('Invalid Email'),
    check('Password').notEmpty().withMessage('Field cannot be blank'),
],authController.signIn);
router.post('/sign-out',authController.signOut);
// forgot password 
router.get('/forgot-password',authController.forgotPasswordPage);
router.post('/forgot-password',authController.forgotPassword);

// retrieve password 
router.get('/retrieve-password/:token', authController.retrievePasswordPage);


module.exports=router;