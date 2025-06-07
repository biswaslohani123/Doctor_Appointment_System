import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'


// Api to register User
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"}) 
        }
        if (!validator.isEmail(email)) {
             return res.json({success: false, message: "Enter a valid Email"})  
        }

        if (password.length < 8) {
             return res.json({success: false, message: "Required Strong password"}) 
        }

        //hashing User Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET )

        res.json({success: true, token})





        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export {registerUser}
