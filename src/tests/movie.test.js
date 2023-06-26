const supertest = require("supertest")
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require('../models/index')

const URL_BASE = '/api/v1/movies';
let movieId;

test("POST -> 'URL', should return status code 201 & res.body.name = movie.name", async() => {
    const genreBody = {
        name: 'drama'
    }
    const genre = await Genre.create(genreBody) 
    const actorBody = {
        firstName: 'Mark',
        lastName: 'Hamill',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1951-09-25'
    }
    const actor = await Actor.create(actorBody) 
    const directorBody = {
        firstName: 'George',
        lastName: 'Lucas',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1944-05-14'
    }
    const director = await Director.create(directorBody) 
    
    const movie = {
        name: 'Star Warss 4',
        image: 'https://via.placeholder.com/150x150', 
        synopsis: 'lorem10',
        releaseYear: 1877
    }

    const res = await supertest(app)
        .post(URL_BASE)
        .send(movie)

    movieId = res.body.id;  //!
    //console.log(res.body)

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name)

    //! Destruirlos para mas claridad en otros tests:
    await genre.destroy();
    await actor.destroy();
    await director.destroy();
})

test("GET ALL -> 'URL', should return status code 200 & res.body.length === 1 & retrieve from others models", async() => {
    const res = await supertest(app)
        .get(URL_BASE)
    //console.log(res.body)

    expect(res.status).toBe(200);
    // expect(res.body).toHaveLength(1);
    expect(res.body[0].genres).toBeDefined();
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
})

test("UPDATE -> 'URL/:id', should return status code 200 & zzzz", async() => {
    const movieUpdated = {
        name: 'Star Wars 4',
        image: 'https://via.placeholder.com/150x150', 
        synopsis: 'lorem17',
        releaseYear: 1977
    }

    const res = await supertest(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(movieUpdated)
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
})

//! /movies/:id/genres
test("POST -> 'URL/:id/genres', should return 200 & res.body.length === 1", async() => {
    const genreBody = {
        name: 'action'
    }
    const genre = await Genre.create(genreBody)

    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([genre.id])
    //console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)

    await genre.destroy();
})

//! /movies/:id/actors
test("POST -> 'URL/:id/actors', should return 200 & res.body.length === 1", async() => {
    const actorBody = {
        firstName: 'Harrison',
        lastName: 'Ford',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1942-07-13'
    }
    const actor = await Actor.create(actorBody)

    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([actor.id])
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    await actor.destroy();
})

//! /movies/:id/directors
test("POST -> 'URL/:id/directors', should return 200 & res.body.length === 1", async() => {
    const directorBody = {
        firstName: 'Steven',
        lastName: 'Speilberg',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1946-12-18'
    }
    const director = await Director.create(directorBody)

    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([director.id])
    console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    await director.destroy();
})

test("DELETE -> 'URL/:id', should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(204)
})