require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const app = express();

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        startServer();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function startServer() {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

initializeDatabase();
