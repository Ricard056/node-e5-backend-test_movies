const supertest = require("supertest")
const app = require("../app")

require("../models/index")

const URL_BASE = '/api/v1/genres'
let genreId;

test("POST -> 'URL', should return tatus code 201 & res.body.name = genre.name", async () => {
    const genre = {
        name: 'drama'
    }

    const res = await supertest(app)
        .post(URL_BASE)
        .send(genre)
    genreId = res.body.id;  //!
    //console.log(genreId);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(genre.name)
})

test("GET ALL -> 'URL', should return 200 & res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(URL_BASE)
    //console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

// test("GET ONE -> 'URL/:id' should return zzz", async() => {
// })

test("UPDATE -> '', sjould return status code 200 & res.body.name === genreUpdated.name", async () => {
    genreUpdated = {
        name: 'mistery'
    }

    const res = await supertest(app)
        .put(`${URL_BASE}/${genreId}`)
        .send(genreUpdated)
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name)
})

test("DELETE -> 'URL/:id', should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${URL_BASE}/${genreId}`)

    expect(res.status).toBe(204)
})