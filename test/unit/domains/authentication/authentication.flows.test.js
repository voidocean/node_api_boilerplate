const authentication_flows = require('../../../../src/domains/authentication/authentication.flows');
const { fetchUserByEmail, validate_password, encodeJWT, decodeJWT, fetchUserSessionByTokens, create_user_session, DeactivateUserSession } = require('../../../../src/domains/authentication/authentication.services');
const user_credential = require('../../../mock-data/authentication/user_credential.json');
const user_session = require('../../../mock-data/authentication/user_session.json');
const user = require('../../../mock-data/authentication/user.json');

jest.mock('../../../../src/domains/authentication/authentication.services')


describe("authentication_flows.authenticate", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_flows.authenticate).toBe('function');
    });
    it("should get an token", async () => {      
        fetchUserByEmail.mockReturnValue(user)
        validate_password.mockReturnValue(true)
        encodeJWT.mockReturnValue(user_credential.jwtToken)
        create_user_session.mockReturnValue(user)
        const result =  await authentication_flows.authenticate(user_credential.email, user_credential.password);
        const expiry_date = new Date();
        expiry_date.setHours(expiry_date.getHours()+24)
        expect(fetchUserByEmail).toBeCalledWith(user_credential.email)
        expect(validate_password).toBeCalledWith(user_credential.password, user.password)
        expect(encodeJWT).toBeCalledWith({ id: user.id, email: user.email, expires: expiry_date })
        expect(create_user_session).toBeCalledWith(user.id, user_credential.jwtToken, expiry_date)
        expect(result).toHaveProperty('token')
    })
    it("should throw an error if user is not found", async () => {
        fetchUserByEmail.mockReturnValue(undefined)    
        await expect(authentication_flows.authenticate()).rejects.toThrow('credential is wrong')
    })
    it("should throw an error if password is not validate", async () => {
        fetchUserByEmail.mockReturnValue(user)    
        validate_password.mockReturnValue(false)
        await expect(authentication_flows.authenticate()).rejects.toThrow({statusCode: 403, message: 'credential is wrong'})
    })
})

describe("authentication_flows.validateToken", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_flows.validateToken).toBe('function');
    });
    it("should return true", async () => {      
        decodeJWT.mockReturnValue(user_credential.decodedToken)
        fetchUserSessionByTokens.mockReturnValue(user_session)
       
        const result =  await authentication_flows.validateToken(user_credential.jwtToken);
        
        expect(decodeJWT).toBeCalledWith(user_credential.jwtToken)
        expect(fetchUserSessionByTokens).toBeCalledWith(user_credential.decodedToken, user_credential.jwtToken)
     
        expect(result).toStrictEqual(true)
    })
    it("should return false", async () => {      
        decodeJWT.mockReturnValue(user_credential.decodedToken)
        fetchUserSessionByTokens.mockReturnValue({status: 'Cancel'})
       
        const result =  await authentication_flows.validateToken(user_credential.jwtToken);
        
        expect(decodeJWT).toBeCalledWith(user_credential.jwtToken)
        expect(fetchUserSessionByTokens).toBeCalledWith(user_credential.decodedToken, user_credential.jwtToken)
     
        expect(result).toStrictEqual(false)
    })
   
})

describe("authentication_flows.splitToken", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_flows.splitToken).toBe('function');
    });
    it("should return Bearer to be remove", async () => {      
        
       
        const result =  await authentication_flows.splitToken("Bearer "+user_credential.jwtToken);
     
        expect(result).toStrictEqual(user_credential.jwtToken)
    })
   
})

describe("authentication_flows.signout", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_flows.signout).toBe('function');
    });
    it("should return Bearer to be remove", async () => {      
        
        DeactivateUserSession.mockReturnValue(true)
        const result =  await authentication_flows.signout(user_credential, user_credential.jwtToken);
        expect(DeactivateUserSession).toBeCalledWith(user_credential.id, user_credential.jwtToken)
        expect(result).toStrictEqual(true)
    })
   
})