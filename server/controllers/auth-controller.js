const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const home = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the project' });
  } catch (error) {
    res.status(400).json({ msg: 'Page not found', error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with hashed password
    const userCreate = await User.create({
      username,
      email,
      phone,
      password: hashedPassword, // Use hashed password
    });

    const token = await userCreate.generateToken();

    return res.status(201).json({
      message: 'Registration successful',
      token,
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    console.error('Error in register function:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist)
      return res.status(400).json({ message: 'Invalid Credentials' });

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

    if (isPasswordCorrect) {
      return res.status(200).json({
        message: 'Login successful',
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(400).json({ msg: 'Internal server error', error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = jwt.sign({ token }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });

    user.resetPasswordToken = resetToken;
    await user.save();

    const resetLink = `https://job-portal-h7sp.onrender.com/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: 'Prit Senjaliya',
        address: process.env.EMAIL,
      },
      to: email,
      subject: "Reset Password ✔",
      text: "Reset password",
      html: `Reset password link: <a href="${resetLink}">${resetLink}</a><br><br><b>The link will expire after one use</b>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ message: 'Password reset email sent' });
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.token) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find the user with the matching reset token
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password and clear the reset token
    user.password = hashedPassword; // Use hashed password
    user.resetPasswordToken = undefined;
    await user.save(); // Save the updated user data

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword function:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { home, register, login, user, forgotPassword, resetPassword };
