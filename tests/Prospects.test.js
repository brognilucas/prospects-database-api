const repository = require('../src/repository/prospects')
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

    let createdProspectCode = null;

    it('Factory should return a code and properties height and weight ', async () => {
        const prospect = factory(prospectMock);
        expect(prospect.code).toBeDefined();
        expect(prospect.name).toEqual(prospectMock.name);
    })

    it('Should create a prospect ', async () => {
        const result = await repository.create(prospectMock)
        expect(result).toHaveProperty('_id');
        expect(result).toHaveProperty('code');
        createdProspectCode = result.code;
    })

    it('Should failed on create prospect without position', async () => {
        let promise = repository.create({ ...prospectMock, position: null })
        expect(Promise.resolve(promise)).rejects.toThrow();
    })

    it('Should find a existent prospect ', async () => {
        const prospect = await repository.findByCode(createdProspectCode);
        expect(prospect).toBeDefined();
        expect(prospect.code).toEqual(createdProspectCode);
    })

    it('Should list an array with more at least one prospect when find by postion = qb ' , async () => { 
        const prospects = await repository.find({  position: 'qb' })
        expect(prospects.length).toBeGreaterThan(0);
    })

    it('List an empty list when filtering by WR position ' , async () => { 
        let result = await repository.find({ position: 'wr' });
        expect(result.length).toEqual(0);
    })

    it('Should update an existent prospect ', async () => {
        const prospect = await repository.findByCode(createdProspectCode);
        let dateOfBirth = new Date(1996, 5, 7);
        Object.assign(prospect, { dateOfBirth })
        const response = await repository.update(prospect);
        let edited = await repository.findByCode(createdProspectCode)
        expect(response).toHaveProperty('ok');
        expect(response.ok).toBe(1);
        expect(edited).toEqual(prospect);
    })

    it('Should delete a prospect by code ', async () => {
        const res = await repository.remove(createdProspectCode)

        expect(res).toHaveProperty('deletedCount');
        expect(res.deletedCount).toEqual(1);
    })

    it('Should receive a list', async () => {
        const results = await repository.find();
        expect(Array.isArray(results)).toBeTruthy();
    })

})