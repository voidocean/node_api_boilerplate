const user_controller = require('../../src/domains/user/user.controller')
const new_user = require('../mock-data/user/new_user.json')
const update_user = require('../mock-data/user/update_user.json')

const httpMocks = require("node-mocks-http");



let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("user_controller.getUser", ()=>{
    it("should have a getUser function", ()=>{
        req.query =  { id: 32 }
        expect(typeof user_controller.getUser).toBe('function');
    });
    it("should return 201 response code", async ()=>{
        req.query =  { id: 32 }
        await user_controller.getUser(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
describe("user_controller.createUser", ()=>{
    it("should have a createUser function", ()=>{
        expect(typeof user_controller.createUser).toBe('function');
    });
    it("should return 201 response code", async ()=>{
        req.body =  new_user;
        await user_controller.createUser(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
describe("user_controller.updateUser", ()=>{
    it("should have a updateUser function", ()=>{
        expect(typeof user_controller.updateUser).toBe('function');
    });
    it("should return 201 response code", async ()=>{
        req.body =  update_user;
        await user_controller.updateUser(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
describe("user_controller.deleteUser", ()=>{
    it("should have a deleteUser function", ()=>{
        expect(typeof user_controller.deleteUser).toBe('function');
    });
    it("should return 201 response code", async ()=>{
        req.query =  { id: 25 }
        await user_controller.deleteUser(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})