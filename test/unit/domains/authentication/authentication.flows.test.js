const authentication_flows = require('../../../../src/domains/authentication/authentication.flows');
const { fetchUserByEmail, validate_password } = require('../../../../src/domains/authentication/authentication.services');
const user_credential = require('../../../mock-data/authentication/user_credential.json');
const user = require('../../../mock-data/authentication/user.json');

jest.mock('../../../../src/domains/authentication/authentication.services')


describe("authentication_flows.login", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_flows.authenticate).toBe('function');
    });
    it("should get an token", async () => {      
        fetchUserByEmail.mockReturnValue(user)
        validate_password.mockReturnValue(true)
        const result =  await authentication_flows.authenticate(user_credential.email, user_credential.password);
        expect(fetchUserByEmail).toBeCalledWith(user.email)
        expect(validate_password).toBeCalledWith(user_credential.password, user.password)
        expect(result).toHaveProperty('token')
    })
    it("should throw an error if user is not found", async () => {
        fetchUserByEmail.mockReturnValue(undefined)    
        await expect(authentication_flows.authenticate()).rejects.toThrow('credential is wrong')
    })
    it("should throw an error if password is not validate", async () => {
        fetchUserByEmail.mockReturnValue(user)    
        validate_password.mockReturnValue(false)
        await expect(authentication_flows.authenticate()).rejects.toThrow('credential is wrong')
    })
})