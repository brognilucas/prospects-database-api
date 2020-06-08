const { find, create, findByCode } = require('../src/repository/prospects')
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const factory = require('../src/factory/prospect')
describe('Prospects Tests', () => {

    let mongoServer;
    let prospectMock = {
        position: 'qb',
        name: 'Russel Wilson',
        college: 'Wisconsin',
        year: 2011
    }
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {}, (err) => {
            if (err) {
                throw err;
            }
        });
    });

    it ('Factory should return a code and properties height and weight ' , async () => { 
        const prospect = factory(prospectMock); 

        expect(prospect.code).toBeDefined();
        expect(prospect.name).toEqual(prospectMock.name);
        expect(prospect).toHaveProperty('height');
        expect(prospect).toHaveProperty('weight');
    })

    it('Should create a prospect ', async () => {
        const result = await create(prospectMock)
        expect(result).toHaveProperty('_id');
        expect(result).toHaveProperty('code');
    })

    it('Should failed on create prospect without position', async () => {
        expect(Promise.resolve(create({ ...prospectMock, position: null }))).rejects.toThrow();
    })

    it('Should find a existent prospect ', async () => {
        const result = await create(prospectMock)
        const prospect = await findByCode(result.code);

        expect(prospect).toBeDefined();
        expect(prospect.code).toEqual(result.code);
    })



    it('Should receive a list', async () => {
        const results = await find();
        expect(Array.isArray(results)).toBeTruthy();
    })

})