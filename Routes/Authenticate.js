const express = require('express')
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


module.exports = Router