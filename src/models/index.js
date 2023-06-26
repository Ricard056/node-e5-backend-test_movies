const Actor = require("./Actor")
const Director = require("./Director")
const Genre = require("./Genre")
const Movie = require("./Movie")

//! MoviesGenres   // Tabla pivote: "MoviesGenres"
Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany(Movie, {through: "MoviesGenres"})

//! MoviesActors   // Tabla pivote: "MoviesActors"
Movie.belongsToMany(Actor, {through: "MoviesActors"})
Actor.belongsToMany(Movie, {through: "MoviesActors"})

//! MoviesDirectors   // Tabla pivote: "MoviesDirectors"
Movie.belongsToMany(Director, {through: "MoviesDirectors"})
Director.belongsToMany(Movie, {through: "MoviesDirectors"})