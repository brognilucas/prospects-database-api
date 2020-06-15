const userFactory = require('../src/factory/user');
const userCtrl = require('../src/controllers/users');
const userRepository = require('../src/repository/users');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../src/index')
describe('User Tests', () => {

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {}, (err) => {
            if (err) {
                throw err;
            }
        });
    });

    const userMock = { name: 'Lucas Brogni', email: 'lucasbrogni16@gmail.com', password: 'bananas_de_pijamas' };
    let userCreatedCode, userCreated;
    it('Factory should return a code ', async () => {
        const user = await userFactory(userMock);
        expect(user.code).toBeDefined();
    })

    it('Factory should create a hash on password ', async () => {
        const user = await userFactory(userMock);
        expect(user.password).not.toBe(userMock.password);
    })

    it('Should validate correctly the passwords ', async () => {
        const user = await userFactory(userMock);
        let response = await userCtrl.validatePassword(userMock.password, user.password)
        expect(response).toBe(true)
    })

    it('Should create a user', async () => {
        const user = await userFactory(userMock);
        const response = await userRepository.create(user);
        expect(response).toHaveProperty('_id');
        userCreated = response;
        userCreatedCode = response.code;
    })

    it('Should failed to create a prospect ', async () => {
        const promise = userRepository.create(userMock);
        expect(Promise.resolve(promise)).rejects.toThrow();
    })


    it('Should find an user by e-mail ', async () => {
        const user = await userRepository.findUserByEmail(userMock.email);
        expect(user).toHaveProperty('_id');
        expect(user.email).toBe(userMock.email);
    })

    it('Should make login', async () => {
        let { status , body } = await request(app).post('/users/sign-in').send({ email: userMock.email, password: userMock.password });
        expect(status).toBe(200);
        expect(body).toHaveProperty('auth', true);
        expect(body).toHaveProperty('user');
    })

    it('Should finish session ' , async () => { 
        let { status } = await request(app).post('/users/logout')

        expect(status).toBe(204);
    })

    it('Should list an array of users ', async () => {
        const result = await userRepository.find();
        expect(result.length).toBeGreaterThan(0);
    })

    it('Should list one result', async () => {
        let response = await userRepository.findOne(userCreatedCode);

        expect(response).toHaveProperty('_id');
        expect(response.code).toBe(userCreatedCode)
        expect(response.name).toBe('Lucas Brogni');
    })

    it('Should update an user ', async () => {
        const mock = { ...userMock, code: userCreatedCode, name: 'José' };
        let result = await userRepository.update(mock);

        expect(result.ok).toBe(1);
        expect(result.nModified).toBe(1);
    })

    it('Should not modify ', async () => {
        const mock = { ...userMock, code: null, name: 'José' };
        let result = await userRepository.update(mock);

        expect(result.nModified).toBe(0)
    })

    it('Should remove an user ', async () => {
        const response = await userRepository.remove(userCreatedCode);
        expect(response).toHaveProperty('deletedCount');
        expect(response.deletedCount).toEqual(1);
    })

})