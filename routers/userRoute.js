const express = require('express');
const userController = require('../controllers/userController');
const ProductBookingApi = require('../controllers/ProductBookingApi')
const LoginController = require('../controllers/LoginController');
const EmployeeController = require('../controllers/EmployeeController');
const ProductController = require('../controllers/ProductController');
const ContactController = require('../controllers/ContactController');
const withdrawalRequest = require('../controllers/withdrawalRequest')
const BusniessCategoryController = require('../controllers/BusniessCategoryController')
const upload = require('../multerConfig');
const  PaymentMethodController  = require('../controllers/PaymentController');
const router = express.Router();
router.post('/registeruser',upload.fields([{ name: 'aadharCard', maxCount: 1 },{ name: 'panCard', maxCount: 1 }]),EmployeeController.createUser);
router.get('/alluser', EmployeeController.getAllUsers);
router.put('/update/:userId', EmployeeController.updateUser);
router.delete('/deleteuser/:userId', EmployeeController.deleteUser);
router.get("/getemployee/:userId", EmployeeController.getUserById);
router.put("/approveUser/:userId", LoginController.approveUser);
// router.post("/verifyOTP/:userId", EmployeeController.verifyOTP);




//Add Products
router.post('/product', upload.single('image'), ProductController.productAdd); 
router.get("/product", ProductController.GetAllProduct);
router.get('/products/:productId', ProductController.getProductByProductId);
router.delete('/product/:productId', ProductController.DeleteProduct);


//BookingApi  routes
router.post('/booking', ProductBookingApi.BookingApi);
router.get('/allbooking', ProductBookingApi.getAllBookings);
router.get("/bookings/:userId", ProductBookingApi.getBookingsByUserId);
router.delete('/booking/:productId', ProductBookingApi.deleteBookingByUserId);
router.put('/approve/:userId', ProductBookingApi.PaymentApproved);

//Contact router
router.post('/Contact', ContactController.CreateContact); 



//add Documents
router.put('/documents/:id', upload.single('image'),userController.editPerks);
router.get("/assets", userController.getAssets);
router.post("/assetsmanagement", userController.assetsManagament);
router.get('/documents', userController.getDocuments);
router.post('/emoployeedocuments', upload.single('documentFile'), userController.employeeDocument); 
router.get('/emoployeedocuments',userController.getEmployeeDocuments);
router.get('/emoployeedocuments/:id',userController.getEmployeeDocuments);


//Withdrawal Routes
router.post('/withdrawal', withdrawalRequest.withdrawal); 
router.get("/withdrawalRequests", withdrawalRequest.getWithdrawalRequests);


//category Routes
router.post('/BusniessCategory', upload.single('categoryImage'), BusniessCategoryController.BusniessCategory);
router.get("/business-categories", BusniessCategoryController.getAllBusinessCategories);
router.delete('/businessCategory/:id', BusniessCategoryController.deleteBusinessCategory);

// payment routes
router.post('/payment-details', upload.single('paymentscreensort'), PaymentMethodController.PaymentMethod);
router.get('/getAllPaymentDetails', upload.single('paymentscreensort'), PaymentMethodController.getAllPaymentDetails);
router.get('/payments/:userId', PaymentMethodController.getPaymentDetailsByUserId);






//Login Router 
router.post('/login',LoginController.loginUser);
router.post('/employee/login',LoginController.EmployeeloginUser);

module.exports = router;
