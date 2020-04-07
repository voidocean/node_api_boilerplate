const authentication_services = require('../../../../src/domains/authentication/authentication.services');
const { User } = require('../../../../src/models')
const bcryptjs = require('bcryptjs')
const user_credential = require('../../../mock-data/authentication/user_credential.json');
const user = require('../../../mock-data/authentication/user.json');

jest.mock('../../../../src/models')


describe("authentication_services.fetchUserByEmail", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.fetchUserByEmail).toBe('function');
    });
    it("should get an user", async () => {      
        User.findOne.mockReturnValue(user)
        const result =  await authentication_services.fetchUserByEmail(user_credential.email);
        expect(User.findOne).toBeCalledWith({where: { email: user_credential.email } })
        expect(result).toStrictEqual(user)
    })
    it("should be empty object", async () => {
        User.findOne.mockReturnValue({})    
        const result =  await authentication_services.fetchUserByEmail();
        expect(result).toStrictEqual({})
    })
})

describe("authentication_services.validate_password", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.validate_password).toBe('function');
    });
    it("should return true", async () => {      
        
        const result =  await authentication_services.validate_password(user_credential.password, user_credential.encryptedPassword);
        
        expect(result).toStrictEqual(true)
    })
    it("should return false", async () => {      
        
        const result =  await authentication_services.validate_password(user_credential.password, "not the right password");
        
        expect(result).toStrictEqual(false)
    })
    
})

describe("authentication_services.encodeJWT", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.encodeJWT).toBe('function');
    });
    it("should return jwtoken value", async () => {      
        
        const token =  await authentication_services.encodeJWT({id: user_credential.id, email: user_credential.email});

        expect(token).toStrictEqual(user_credential.jwtToken)
    })
    
})