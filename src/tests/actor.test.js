const supertest = require("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/actors'

let actorId;

test("POST -> 'URL', should return status code 201 & res.body.name = actor.name", async () => {
    const actor = {
        firstName: 'Marc',
        lastName: 'Hamilton',
        nationality: 'Canada',
        image: 'https://via.placeholder.com/150x150',
        birthday: '2000-01-25'
    }

    const res = await supertest(app)
        .post(URL_BASE)
        .send(actor)
    actorId = res.body.id; //!
    //console.log(res.body);

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
})

test("GET ALL -> 'URL', should return status code 200 & res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(URL_BASE)
    //console.log(res.body)

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("UPDATE -> 'URL/:id', should return 200 & res.body.firstName === actorUpdated.firstName", async () => {
    const actorUpdated = {
        firstName: 'Mark',
        lastName: 'Hamill',
        nationality: 'USA',
        image: 'https://via.placeholder.com/150x150',
        birthday: '1951-09-25'
    }

    const res = await supertest(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(actorUpdated)
    //console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actorUpdated.firstName)
})

test("DELETE -> 'URL/:id', should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${URL_BASE}/${actorId}`)
    //console.log(res.body)

    expect(res.status).toBe(204)
})