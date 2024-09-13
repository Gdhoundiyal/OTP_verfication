require("dotenv").config();
const twilio = require("twilio");
const crypto = require("crypto");
const express = require("express");
var cors = require('cors')
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
console.log(process.env.TWILIO_PHONE_NUMBER)
const app = express();
// Generate OTP function

app.use(cors())

app.get("/", (req, res) => {
  res.send("running");
});

app.post("/sendotp/:phone", async (req, res) => {
  const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
  };
  const toPhoneNumber = req.params.phone;
  const otp = generateOTP();
  console.log(toPhoneNumber, otp);
  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${toPhoneNumber}`,
    });

    res.send([{phonenum:`${toPhoneNumber}`,otp: `${otp}`}]);
  } catch (error) {
    res.status(500).json({message:"Error sending OTP:", error});
  }
});

const port = 3100;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
