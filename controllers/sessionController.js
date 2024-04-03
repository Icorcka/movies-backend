const User = require('../models/user');
const generateAccessToken = require('../services/tokenService');

const createSession = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        const token = generateAccessToken(user.name);
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { createSession };
