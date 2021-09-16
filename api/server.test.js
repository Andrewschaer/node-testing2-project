const request = require('supertest')
const server = require('./server');
const db = require('../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /superheros', () => {
    test('responds with 200 OK', async () => {
        const res = await request(server).get('/superheros')
        console.log(res.body)
        expect(res.status).toBe(200)
    })
    test('responds with all superhero', async () => {
        const res = await request(server).get('/superheros')
        expect(res.body).toHaveLength(4)
    })
})

describe('[POST] /superheros', () => {
    test('responds with the new superhero', async () => {
        const res = await request(server)
            .post('/superheros')
            .send({ name: 'ironman' })
        expect(res.body).toMatchObject({ id: 5, name: 'ironman' })
    })
    test('respond with a 422 on missing name', async () => {
        const res = await request(server)
            .post('/superheros')
            .send({ name: undefined })
        expect(res.status).toBe(422)
    })
})