const jwt = require('jsonwebtoken');

const createAccessToken = id => jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

const createRefreshToken = id => jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

module.exports = { createAccessToken, createRefreshToken };
