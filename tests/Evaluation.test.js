const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const factory = require('../src/factory/evaluation')
const db = require('../src/repository/evaluations')
describe('Prospects Tests', () => {

    let mongoServer , prospectId;
    
    let evaluationMock = { 
          userCode: 'mockUser',
          summary: 'Mock Summary',
          bestSkills: ['Mock Bests Skills'],
          worstSkills: ['Mock Worst Skills'], 
          overall: 8,
          hasRedFlag: false
    }; 
    let id = null;

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {}, (err) => {
            if (err) {
                throw err;
            }
        });

        const prospectRepository = require('../src/repository/prospects');
        const prospectFactory = require('../src/factory/prospect');

        let prospectMock = {
            position: 'qb',
            name: 'Russel Wilson',
            college: 'Wisconsin',
            year: 2011
        };

        const result = await prospectRepository.create(prospectFactory(prospectMock))
        prospectId = result._id

        Object.assign(evaluationMock, { prospectId: prospectId })
    }); 


    it('Factory should return a code ', async () => { 
        const mock = await factory(evaluationMock)
        expect(mock.code).toBeDefined();
    })

    it('Should be possible to create a evaluation ' , async () => { 
        const mock = await factory(evaluationMock);

        let response = await db.create(mock);
        expect(response._id).toBeDefined();
        expect(response.overall).toBe(mock.overall)
        id = response._id;
    })

    it('Should be able to list evaluations ' , async () => { 
        let response = await db.find(prospectId);
        expect(Array.isArray(response)).toBeTruthy();
        expect(response.length).toBeGreaterThan(0);
    })

})