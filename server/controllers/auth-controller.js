const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user.model');
const { createAccessToken, createRefreshToken } = require('../middleware/token');

const AuthController = {
  register: async (req, res) => {
    try {
      const { fullName, username, password, email, gender } = req.body;

      const newUserName = username.toLowerCase().replace('/ /g', '');
      const foundUserByUsername = await Users.findOne({ username: newUserName });

      if (foundUserByUsername) {
        return res.status(400).json({ msg: 'This is username already exist.' });
      }

      const foundUserByEmail = await Users.findOne({ email });

      if (foundUserByEmail) {
        return res.status(400).json({ msg: 'This is email already exist.' });
      }

      if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters.' });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullName,
        username: newUserName,
        password: passwordHash,
        email,
        gender
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000
      });

      await newUser.save();

      res.json({
        msg: 'Register Success.',
        accessToken,
        user: {
          ...newUser._doc,
          password: ''
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate('followers following', '-password');
      if (!user) {
        return res.status(400).json({ msg: 'This is mail does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(999, user);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Password is incorrect.' });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000
      });

      res.json({
        msg: 'Login Success.',
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logged out.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(400).json({ msg: 'Please login now.' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err) {
          return res.status(400).json({ msg: 'Please login now.' });
        }

        const user = await Users.findById(result.id).select('-password').populate('followers following', '-password');

        if (!user) {
          return res.status(400).json({ msg: 'This user does not exist.' });
        }

        const accessToken = createAccessToken({ id: result.id });

        res.json({
          accessToken,
          user
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = AuthController;
