import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Doctor Updated " });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// gettding all doctor list for frontend

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({success:true, doctors})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Doctor Not Found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({
        success: true,
        message: "Login successful",
        token,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          available: doctor.available,
        },
      });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export { changeAvailability, doctorList, loginDoctor };
