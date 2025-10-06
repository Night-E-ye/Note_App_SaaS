const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

// Secret key for JWT (store in environment variable for production)
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
}




// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- CORRECT ORDER ---
    // 1. Create the new user in memory
    const newUser = new User({ username, email, password: hashedPassword });

    // 2. Save the user to the database
    await newUser.save();

    // 3. NOW you can send the response with the user's ID
    res.status(201).json({ 
        message: "User registered successfully!", 
        userId: newUser._id 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
// REPLACE your current login route with this one in routes/auth.js

// REPLACE your current login route with this one in routes/auth.js

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (err) { // The 'try' block is now correctly closed before this 'catch'
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// ROUTE 1: FORGOT PASSWORD - Generate token & send email using Ethereal
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Note: We don't reveal if the user was found for security reasons
      return res.status(200).json({ message: 'If a user with that email exists, a reset link has been sent.' });
    }

    // 1. Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hash token and set it on the user model with an expiry date
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 3600000; // Expires in 1 hour
    await user.save();

    // 3. Create the reset URL
    const resetURL = `https://${req.get('host')}/reset-password.html?token=${resetToken}`;

    // 4. Send the email using Ethereal (for testing)
     nodemailer.createTestAccount(async (err, account) => {
        if (err) {
            console.error('Failed to create a testing account: ' + err.message);
            return res.status(500).json({error: 'Failed to create email test account.'});
        }
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: { user: account.user, pass: account.pass }
        });
        const message = await transporter.sendMail({
            to: user.email,
            from: `NoteApp Support <support@noteapp.com>`,
            subject: 'Your NoteApp Password Reset Link',
            text: `Click the following link to reset your password: ${resetURL}`
        });
        console.log("Password reset email sent. Preview URL: %s", nodemailer.getTestMessageUrl(message));
    });

    res.status(200).json({ message: 'If a user with that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while sending email.' });
  }
});


// ROUTE 2: RESET PASSWORD - Verify token & update password
router.post('/reset-password/:token', async (req, res) => {
  try {
    // 1. Hash the token from the URL to match what's in the DB
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // 2. Find the user by the hashed token and check if it has not expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // 3. Set the new password
    user.password = await bcrypt.hash(req.body.password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been successfully updated!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

module.exports = router;
