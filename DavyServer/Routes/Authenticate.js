const express = require('express')
const crypto = require('crypto')
require('dotenv').config()
const nodeMailer = require('nodemailer')
const User = require('../Model/User')
const Router = new express.Router()

Router.post("/login", async function (req, res) {
  try {
    const { password, username } = req.body;
    if (!password || !username) {
      return res.status(400).json({ msg: "please input all fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "user is not found" });
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "incorrect Password" });
    }
    // Assigning token to users
    const token = await user.createJwt()

    // stores the token in a cookie
    res.cookie('authorizeuser', token, {
      maxAge: 3600000,
      httpOnly: true,
    })
    // Send response after all checks are complete and store jwt in cookies
    res.status(200).send({ token })

  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

//Register route for a registering a user
Router.post("/register", async function (req, res) {
  try {
    const { firstname, lastname, email, password, username } = req.body

    const user = await User.findOne({ username })

    if (user) {
      return res.send('Username already used')
    }

    const newUser = new User({
      password,
      username,
      email,
      firstname,
      lastname
    })

    await newUser.save()
    const token = newUser.createJwt()

    res.cookie('authorizeuser', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 90000)

    })
    res.status(200).json({ token })

  } catch (err) {
    console.error(err)
    res.status(500).send('Registration failed')
  }
})
Router.post('/forgetpassword', async function (req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ msg: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate OTP and expiration time
    const otp = crypto.randomInt(100000, 999999); // Random 6-digit OTP
    const expiresIn = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes

    // Configure nodemailer transporter
    const transponder = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
      }
    });

    // Send mail to the user's registered email
    await transponder.sendMail({
      from: process.env.EMAIL_USER,
      to: "elenakolisnyk6@gmail.com", // Use user's registered email
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>Your OTP for password reset is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 15 minutes.</p>
      `
    });

    // Send success response
    return res.status(200).json({ msg: "OTP sent successfully" });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "An error occurred while processing your request" });
  }
});


module.exports = Router