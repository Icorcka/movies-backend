const Movie = require('../models/movie');
const Actor = require('../models/actor');
const parseMoviesFromFile = require('../services/parseMovies');
const path = require('path');
const os = require('os');

const movieController = {
    async addMovie(req, res) {
        const { actors = [], ...movieDetails } = req.body;
    
        try {
          const newMovie = await Movie.create(movieDetails);
    
          for (const actorName of actors) {
            let actor = await Actor.findOne({ where: { name: actorName } });
            if (!actor) {
              actor = await Actor.create({ name: actorName });
            }
            await newMovie.addActor(actor);
          }
    
          res.status(201).json(newMovie);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },

  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      await movie.destroy();
      res.status(200).send('Movie deleted');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getMovie(req, res) {
    try {
      const movie = await Movie.findByPk(req.params.id, {
        include: Actor
      });
      if (!movie) {
        return res.status(404).send('Movie not found');
      }

      const response = movie.toJSON();
      if (response.isImported) {
        response.source = `http://${os.hostname()}:${process.env.PORT}/download/sample_movies.txt`;
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listMovies(req, res) {
    try {
      const movies = await Movie.findAll({ order: [['name', 'ASC']] });
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findMovieByName(req, res) {
    try {
      const movies = await Movie.findAll({
        where: { name: req.params.name },
        include: Actor
      });
      if (!movies.length) {
        return res.status(404).send('No movies found');
      }

      const response = movies.map(movie => {
        const movieData = movie.toJSON();
        if (movieData.isImported) {
          movieData.source = `http://${os.hostname()}:${process.env.PORT}/download/sample_movies.txt`;
        }
        return movieData;
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  

  async findMoviesByActor(req, res) {
    try {
      const actor = await Actor.findOne({ where: { name: req.params.actor } });
      if (!actor) {
        return res.status(404).send('Actor not found');
      }
  
      const movies = await actor.getMovies();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async importMovies(req, res) {
    try {
      const filePath = path.join(__dirname, '../sample_movies.txt');
      const movies = parseMoviesFromFile(filePath);

      for (const movieData of movies) {
        const { actors, ...movieDetails } = movieData;
        const newMovie = await Movie.create(movieDetails);

        for (const actorName of actors) {
          let actor = await Actor.findOne({ where: { name: actorName } });
          if (!actor) {
            actor = await Actor.create({ name: actorName });
          }
          await newMovie.addActor(actor);
        }
      }

      res.status(201).send('Movies imported successfully');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = movieController;
