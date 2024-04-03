# Movie Management API

This project is an Express-based API for managing a database of movies. It supports operations like adding new movies, deleting movies, searching movies by ID and name, importing movies from a file, and more. The API uses Sequelize as an ORM to interact with an SQLite database.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have installed:
- Node.js
- npm (Node Package Manager)

### Installing

Follow these steps to get your development environment set up:

1. Clone the repository:
   ```bash
   git clone [repository URL]

2. Navigate to the project directory:
    ```bash
   cd [local repository]

3. Install the necessary dependencies:
    ```bash
   npm install

4. Start application:
    ```bash
    npm start

5. To run the server with hot reloading(using nodemon):
    ```bash
    npm run watch
## Usage

The API supports several endpoints for managing movies:

- **POST /movies/create**: Add a new movie.
- **GET /movies/:id**: Retrieve a movie by its ID.
- **DELETE /movies/:id**: Delete a movie by its ID.
- **POST /movies/import**: Import movies from a predefined text file.
- **GET /movies/search/name/:name**: Find movies by their name.
- **GET /movies/search/actor/:actor**: Find movies by an actor's presence.

### Importing Movies

To import movies from the `sample_movies.txt` file, use the `/movies/import` endpoint. This will read the file and add each movie to the database, marking them as imported.

## Running the Server

- To start the server: `npm start`
- To run the server with nodemon: `npm run watch`

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime used
- [Express](https://expressjs.com/) - The web framework
- [Sequelize](https://sequelize.org/) - ORM for database interactions

## Docker

1. To run the app using Docker:

    ```bash
    docker run -p 3000:3000 yourusername/movie-api

