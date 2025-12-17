const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists) return res.status(400).json({ message: 'Phone already used' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, phone, password: hashed, role });

    res.json({
      message: "User Registered",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Success",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
