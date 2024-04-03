const fs = require('fs');

const parseMoviesFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const moviesRaw = content.split('\n\n').filter(Boolean);
  
  return moviesRaw.map(movieRaw => {
    const lines = movieRaw.split('\n');
    const movie = {};

    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      switch (key) {
        case 'Title':
          movie.name = value;
          break;
        case 'Release Year':
          movie.releaseYear = parseInt(value);
          break;
        case 'Format':
          movie.format = value;
          break;
        case 'Stars':
          movie.actors = value.split(',').map(s => s.trim());
          break;
        default:
          break;
      }
    });

    movie.isImported = true;
    return movie;
  });
};

module.exports = parseMoviesFromFile;
