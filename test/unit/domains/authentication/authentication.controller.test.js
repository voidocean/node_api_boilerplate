const authentication_controller = require('../../../../src/domains/authentication/authentication.controller');
const { authenticate, validateToken, splitToken, signout } = require('../../../../src/domains/authentication/authentication.flows');
const user_credential = require('../../../mock-data/authentication/user_credential.json');

jest.mock('../../../../src/domains/authentication/authentication.flows')

const httpMocks = require("node-mocks-http");

const bearer_token = 'Bearer '+user_credential.jwtToken

beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("authentication_controller.login", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_controller.login).toBe('function');
    });
    it("should return 200 response code", async ()=>{
        authenticate.mockReturnValue({token: ''})
        await authentication_controller.login(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toHaveProperty('token')
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in authentication'};
        const rejectedPromise = Promise.reject(errorMessage);

        authenticate.mockReturnValue(rejectedPromise);
        await authentication_controller.login(req, res, next);
        expect(next).toBeCalledWith(errorMessage)
        
    })
})

describe("authentication_controller.checkToken", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_controller.checkToken).toBe('function');
    });
    it("should return 200 response code", async ()=>{
        //req.headers.authorization = 'Bearer '+user_credential.jwtToken
        splitToken.mockReturnValue(user_credential.jwtToken);
        validateToken.mockReturnValue(true)
        await authentication_controller.checkToken(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toHaveProperty('token')
    })
    it("should return 401 response code", async ()=>{
        const failed_check_error = { statusCode: 401, message: 'token is not valid' }
        splitToken.mockReturnValue(user_credential.jwtToken);
        validateToken.mockReturnValue(false)
        await authentication_controller.checkToken(req, res, next);
        expect(res.statusCode).toBe(failed_check_error.statusCode);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({message: failed_check_error.message})
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in authentication'};
        const rejectedPromise = Promise.reject(errorMessage);
        req.headers.authorization = 'Bearer '+user_credential.jwtToken
        validateToken.mockReturnValue(rejectedPromise);
        await authentication_controller.checkToken(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
})

describe("authentication_controller.logout", ()=>{
    it("should be a function", ()=>{
        expect(typeof authentication_controller.logout).toBe('function');
    });
    it("should return 200 response code with a successful message", async ()=>{
        
        req.headers.authorization = bearer_token
        splitToken.mockReturnValue(user_credential.jwtToken);
        signout.mockReturnValue(true)
        await authentication_controller.logout(req, res, next);
        expect(splitToken).toBeCalledWith(bearer_token)
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({ message: 'sign out successful' })
    })
    it("should return 500 response code with a successful message", async ()=>{
        
        req.headers.authorization = bearer_token
        splitToken.mockReturnValue(user_credential.jwtToken);
        signout.mockReturnValue(false)
        await authentication_controller.logout(req, res, next);
        expect(splitToken).toBeCalledWith(bearer_token)
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({ message: 'sign out failed' })
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in logout'};
        const rejectedPromise = Promise.reject(errorMessage);
        req.headers.authorization = bearer_token
        signout.mockReturnValue(rejectedPromise);
        await authentication_controller.logout(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
})