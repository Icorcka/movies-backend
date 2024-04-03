const User = require('../models/user');
const generateAccessToken = require('../services/tokenService');

const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const newUser = await User.create({ name, email, password });
        const token = generateAccessToken(newUser.name);
        res.json({ token: token });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { createUser };
