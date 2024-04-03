require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/movies', movieRoutes);
app.get('/download/sample_movies.txt', (req, res) => {
    res.download('./sample_movies.txt');
});  

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
    const Movie = require('./models/movie');
    const Actor = require('./models/actor');

    Movie.belongsToMany(Actor, { through: 'MovieActors' });
    Actor.belongsToMany(Movie, { through: 'MovieActors' });
    try {
        await sequelize.sync({ force: true });
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
