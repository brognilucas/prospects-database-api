const userFactory = require('../src/factory/user');
const userCtrl = require( '../src/controllers/users');

describe('User Tests', async () => {
    const userMock = { name: 'Lucas Brogni', email: 'lucasbrogni16@gmail.com' , password: 'bananas_de_pijamas'  };
    
    it ('Factory should return a code ' , async () => { 
        const user = await userFactory(userMock); 
        expect(user.code).toBeDefined(); 
    })

    it('Factory should create a hash on password ' , async () => { 
        const user = await userFactory(userMock); 
        expect(user.password).not.toBe(userMock.password);
    })

    it('Should validate correctly the passwords ',  async () => {
        const user = await userFactory(userMock);
        let response = await userCtrl.validatePassword(userMock.password , user.password)
        expect(response).toBe(true)
    })
})