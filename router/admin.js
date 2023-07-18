const adminController=require('../controllers/admincontroller')
const router=require('express').Router();
router.get('/add-product', adminController.addProductPage)
router.post('/add-product', adminController.addProduct);
router.get('/', adminController.homePage);
module.exports=router;