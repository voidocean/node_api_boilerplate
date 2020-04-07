const authentication_controller = require('../../../../src/domains/authentication/authentication.controller');
const { authenticate } = require('../../../../src/domains/authentication/authentication.flows');
const user_credential = require('../../../mock-data/authentication/user_credential.json');

jest.mock('../../../../src/domains/authentication/authentication.flows')

const httpMocks = require("node-mocks-http");
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