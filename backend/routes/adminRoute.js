import express from 'express'
import { addDoctor, AllDoctors, loginAdmin } from '../controllers/adminController.js'
import upload from '../config/multer.js'
import authAdmin from '../middleware/authAdmin.js';


const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single("image"), addDoctor);
adminRouter.post('/admin-login',loginAdmin);
adminRouter.post('/doctor-list',authAdmin, AllDoctors)

export default adminRouter