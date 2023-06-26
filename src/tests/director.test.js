const supertest = require("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/directors';
let directorId;

test("POST -> 'URL', should return status code 201 & res.body.firstName = director.name", async() => {
    const director = {
        firstName: 'Jorge',
        lastName: 'Lukas',
        nationality: 'UK',
        image: 'https://via.placeholder.com/150x150',
        birthday: '2000-02-26'
    }

    const res = await supertest(app)
        .post(URL_BASE)
        .send(director)
    directorId = res.body.id; //!
    //console.log(res.body)

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET ALL -> 'URL', should return status code 200", async() => {
    const res = await supertest(app)
        .get(URL_BASE)
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("UPDATE -> 'URL/:id', should return 200 & res.body.firstName = directorUpdated.firstName", async() => {
    const directorUpdated = {
        firstName: 'George',
        lastName: 'Lucas',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1944-05-14'
    }

    const res = await supertest(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(directorUpdated)
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName)
})

test("DELETE -> 'URL/:id', should return status code 204", async() => {
    const res = await supertest(app)
        .delete(`${URL_BASE}/${directorId}`)
    //console.log(res.body)

    expect(res.status).toBe(204)
})