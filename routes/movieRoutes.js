const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

router.post('/', movieController.addMovie);
router.delete('/:id', movieController.deleteMovie);
router.get('/:id', movieController.getMovie);
router.get('/', movieController.listMovies);
router.get('/search/name/:name', movieController.findMovieByName);
router.get('/search/actor/:actor', movieController.findMoviesByActor);
router.post('/import', movieController.importMovies);

module.exports = router;
