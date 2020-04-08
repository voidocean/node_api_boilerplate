const authentication_services = require('../../../../src/domains/authentication/authentication.services');
const { User, User_session } = require('../../../../src/models')
const bcryptjs = require('bcryptjs')
const user_credential = require('../../../mock-data/authentication/user_credential.json');
const user = require('../../../mock-data/authentication/user.json');
const user_session = require('../../../mock-data/authentication/user_session.json');

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

describe("authentication_services.fetchUserSessionByTokens", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.fetchUserSessionByTokens).toBe('function');
    });
    it("should get an user session", async () => {  
        const test_user_session =     { 
            user_id: user_credential.decodedToken.id, 
            token: user_credential.jwtToken, 
            expiry_date: user_credential.decodedToken.expires, 
            status: 'Active'
        } 
        User_session.findOne.mockReturnValue(test_user_session)
        const result =  await authentication_services.fetchUserSessionByTokens(user_credential.decodedToken, user_credential.jwtToken);
        expect(User_session.findOne).toBeCalledWith({
            where: { 
                user_id: user_credential.decodedToken.id, 
                token: user_credential.jwtToken, 
                expiry_date: user_credential.decodedToken.expires, 
                status: 'Active'
            } 
        })
        expect(result).toStrictEqual(test_user_session )
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
        
        const token =  await authentication_services.encodeJWT({id: user_credential.id, email: user_credential.email, expires: user_credential.jwtExpireDate });

        expect(token).toStrictEqual(user_credential.jwtToken)
    })
    
})
describe("authentication_services.decodeJWT", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.decodeJWT).toBe('function');
    });
    it("should return jwtoken value", async () => {      
        
        const token =  await authentication_services.decodeJWT(user_credential.jwtToken);

        expect(token).toStrictEqual(user_credential.decodedToken)
    })
    
})

describe("authentication_services.create_user_session", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_services.create_user_session).toBe('function');
    });
    it("should return jwtoken value", async () => {      
        User_session.create.mockReturnValue(user_session)
        const userSession =  await authentication_services.create_user_session(user_credential.id, user_credential.jwtToken, user_credential.jwtExpireDate);

        expect(userSession).toStrictEqual(user_session)
    })
    
})