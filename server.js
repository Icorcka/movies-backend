require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: false });
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
