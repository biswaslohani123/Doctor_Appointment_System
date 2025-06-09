import express from 'express'
import { addDoctor, adminDashboard, AllDoctors, appointmentAdmin, cancelAppointment, loginAdmin } from '../controllers/adminController.js'
import upload from '../config/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single("image"), addDoctor);
adminRouter.post('/admin-login',loginAdmin);
adminRouter.post('/doctor-list',authAdmin, AllDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/get-appointment',authAdmin, appointmentAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/admin-dashboard', authAdmin, adminDashboard)

export default adminRouter