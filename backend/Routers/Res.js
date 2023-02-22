const User = require("../Schema/Res_Mod");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");
const OTP = require("../Schema/OTP");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Amitisagoodb$oy";
router.post("/register", async (req, res, next) => {
  try {
    const { phone_no, password } = req.body;
    const phone_noCheck = await User.findOne({ phone_no });
    if (phone_noCheck)
      return res.json({ msg: "Phone_ No already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      phone_no,
      password: hashedPassword,
    });
    delete user.password;
    const data = {
      user: {
        id: user._id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
   
    success = true;
    return res.json({
      msg: "Registeration successfully",
      authtoken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone_no, password } = req.body;
    const user = await User.findOne({ phone_no });

    if (!user)
      return res.json({ msg: "Incorrect  Phone_no Id", status: false })
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, "kjnkj", user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(authtoken);
    success = true;
    return res.json({
      msg: "Loged In Successfully",
      authtoken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.post("/sendotp", async (req, res) => {
  let data = await User.findOne({ phone_no: req.body.phone_no });
  // console.log(data);
  // console.log(req);
  const resType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1).toString();
    var options = {
      authorization: process.env.API_key,
      message: `Your OTP is ${otpcode}`,
      numbers: [req.body.phone_no],
    };
    fast2sms.sendMessage(options).then((response) => {
      console.log(response);
    });
    console.log(options);

    console.log(otpcode);
    const salt = 10;
    const hashedOtp = await bcrypt.hash(otpcode, salt);
    let otpData = new OTP({
      PhoneNo: req.body.phone_no,
      code: hashedOtp,
      expire: Date.now() + 3600000,
      userId: req.body.id,
    });
    // console.log(otpData);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
    await otpData.save();
    // res.send(res);
    resType.statusText = "Success";
    resType.message = "OTP Sent Successfully";
  } else {
    resType.statusText = "Failed";
    resType.message = "Phone Number does not exist";
  }
  res.status(200).json(resType);
});

router.post("/verifyotp", async (req, res) => {
  try {
    const { PhoneNo, code } = req.body;
    if (!PhoneNo || !code) {
      res.json({ msg: "Empty not allowed" });
    } else {
      const OtpVerifyicationRecord = await OTP.find({ PhoneNo });
      console.log(OtpVerifyicationRecord);
      if (OtpVerifyicationRecord.length <= 0) {
        throw new Error("Phone Number does not exists");
      } else {
        const { expired } = OtpVerifyicationRecord[0].expire;
        const hashedOtp = OtpVerifyicationRecord[0].code;
        // console.log(hashedOtp);
        // console.log(expired);
        console.log(OtpVerifyicationRecord[0], "gutguy");

        if (expired < Date.now()) {
          var del = await OtpVerifyicationRecord.deleteMany({ PhoneNo });
          console.log(del, "khgguy");
          throw new Error(" Code has been expired");
        } else {
          const validOtp = await bcrypt.compare(code, hashedOtp);
          console.log(code, "dfggff", hashedOtp);
          console.log(validOtp);
          if (!validOtp) {
            throw new Error("Invalid OTP");
          } else {
            await User.updateOne({ phone_no: req.body.phone_no });
            // await OtpVerifyicationRecord.delete({ PhoneNo });
            console.log();
            res.json({
              status: "VERIFIED",
              msg: "Number Verified ",
            });
          }
        }
      }
    }
    // console.log(OtpVerfyicationRecord);
  } catch (error) {
    res.json({
      status: "Failed",
      msg: error.message,
    });
  }
});

router.post('/getuser',fetchuser, async (req, res) =>{
  try { 
      userId = req.user.id;
      const user = await User.findById(userId).select("-password ")
      res.send(user)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error") 
  }
  
  })

module.exports = router;
