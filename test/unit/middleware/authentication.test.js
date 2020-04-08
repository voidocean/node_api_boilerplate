const { auth_required } = require('../../../src/middlewares/authentication');
const user_credential = require('../../mock-data/authentication/user_credential.json');
const user_session = require('../../mock-data/authentication/user_session.json');
const user = require('../../mock-data/authentication/user.json');
var passport = require("passport");
const { User, User_session } = require('../../../src/models');
const httpMocks = require("node-mocks-http");

User.findOne = jest.fn()
User_session.findOne = jest.fn()

let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})


describe("authentication test", ()=>{
    it("should be a function", ()=>{
        expect(typeof auth_required).toBe('function');
    });
    it("should pass the authentication", async () => {
        req.headers.authorization = "Bearer "+user_credential.jwtToken;
        User_session.findOne.mockReturnValue(user_session);
        User.findOne.mockReturnValue(user);
        passport.authenticate = jest.fn((authType, options, callback) => () => { callback(user_credential.decodedToken); });
        await auth_required(req, res, next);
        expect(passport.authenticate).toHaveBeenCalledTimes(1);
        expect(User_session.findOne).toBeCalledWith({ where: { 
            user_id: user_credential.decodedToken.id, 
            token: user_credential.jwtToken, 
            expiry_date: user_credential.decodedToken.expires, 
            status: 'Active' }
        })


        
    })
    it("should return 403 without the user_session", async () => {
        req.headers.authorization = user_credential.jwtToken;
        User_session.findOne.mockReturnValue(false);
        
        
        passport.authenticate = jest.fn((authType, options, callback) => () => { callback(user_credential.decodedToken); });
        await auth_required(req, res, next);
        expect(passport.authenticate).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(403);
        expect(res._isEndCalled()).toBeTruthy();

        
    })
    it("should return 403 with message access deneid", async () => {
        req.headers.authorization = user_credential.jwtToken        
        passport.authenticate = jest.fn((authType, options, callback) => () => { callback(false); });
        await auth_required(req, res, next);
        expect(passport.authenticate).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(403);
        expect(res._isEndCalled()).toBeTruthy();


        
    })
})
