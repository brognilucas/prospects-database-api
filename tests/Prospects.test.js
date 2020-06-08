const { find } = require('../src/repository/prospects')
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Prospects Tests', () => {

    let mongoServer;
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {}, (err) => {
            if (err) { 
                throw err;
            }
        });
    });


    it('Should list a empty list', async () => {
        const results = await find();
        expect(results).toEqual([]);
    })

})