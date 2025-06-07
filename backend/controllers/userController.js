import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'

// Api to register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Required Strong password" });
    }

    //hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//Login User
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success: false, message: "user doesnot exists"})  
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success: true, token})
            
        }else{
            res.json({ success: false, message: "Inavlid credintials" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get User Profile

const getProfile = async (req, res) => {

      try {
        
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true, userData})

      } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message });

      }
}

//To update user Profile
const updateProfile = async (req, res) => {
  try {

    const {userId, name, phone, address, dob, gender} = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({success: false, message: "Data Missing"})
    }

    await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob,gender})

    if (imageFile) {

      // upload image to cloudinary
      const imageUpload =  await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'})
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId,{image:imageURL})
      
    }
    res.json({success: true, message: "Profile Updated"})


    
  } catch (error) {
     console.log(error.message);
     res.json({ success: false, message: error.message });
  }
}

export { registerUser, loginUser, getProfile, updateProfile };
