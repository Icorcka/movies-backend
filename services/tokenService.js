const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    const expireTime = '2h';

    const secretKey = process.env.JWT_SECRET;

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    
    return jwt.sign(payload, secretKey, { expiresIn: expireTime });
};

module.exports = generateAccessToken;
