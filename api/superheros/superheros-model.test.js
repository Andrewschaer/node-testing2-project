const Superhero = require('./superheros-model');
const db = require('../../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

describe('Superheros Model', () => {
    describe('getAll', () => {
        test('returns all superheros in table', async () => {
            const superheros = await Superhero.getAll()
            expect(superheros).toHaveLength(4)
        })
        test('returns superheros in the correct shape', async () => {
            const expected = [
                {
                    "id": 1,
                    "name": "spiderman"
                },
                {
                    "id": 2,
                    "name": "superman"
                },
                {
                    "id": 3,
                    "name": "batman"
                },
                {
                    "id": 4,
                    "name": "wonderwoman"
                }
            ]
            expect(await Superhero.getAll()).toMatchObject(expected)
        })
    })
    describe('getById', () => {
        test('returns superheros with correct properties', async () => {
            const spiderman = await Superhero.getById(1);
            expect(spiderman).toMatchObject({ id: 1, name: 'spiderman'})
            const batman = await Superhero.getById(3);
            expect(batman).toMatchObject({ id: 3, name: 'batman'})
        })
    })
    describe('insert', () => {
        test('creates a new superhero in the db', async () => {
            await Superhero.insert({ name: 'ironman' })
            const superheros = await db('superheros')
            expect(superheros).toHaveLength(5)
        })
        test('resolves to the newly created Superhero', async () => {
            const newSuperhero = await Superhero.insert({ name: 'ironman'})
            expect(newSuperhero).toMatchObject({ id: 5, name: 'ironman'})
        })
    })
    
})

test('the environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})