const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();


const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };

    const savedUser = await User.create(user);
    res.status(201).json({ email: savedUser.email });

  } catch (error) {
    res.status(500).send('Oops, something went wrong');
  }
};

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send("Invalid email or password");
    }
    

    const accessToken = jwt.sign(
  { userId: user._id },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '2h' }
);

    res.status(200).json({accessToken: accessToken})
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { signUp, logIn };
