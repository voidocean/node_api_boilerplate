const user_controller = require('../../../../src/domains/user/user.controller')
const { getUserByID, addUser, editUser, removeUser  } = require('../../../../src/domains/user/user.flows')
const new_user = require('../../../mock-data/user/new_user.json')
const update_user = require('../../../mock-data/user/update_user.json')

const httpMocks = require("node-mocks-http");

jest.mock('../../../../src/domains/user/user.flows')

let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("user_controller.getUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_controller.getUser).toBe('function');
    });
    it("should return 200 response code", async ()=>{
        getUserByID.mockReturnValue(new_user)
        await user_controller.getUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(new_user)
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in get User'};
        const rejectedPromise = Promise.reject(errorMessage);

        getUserByID.mockReturnValue(rejectedPromise);
        await user_controller.getUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
    it("should return 404 when item doesnt exist", async () => {
        getUserByID.mockReturnValue(null)
        await user_controller.getUser(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
describe("user_controller.createUser", ()=>{
    it("should have a createUser function", ()=>{
        expect(typeof user_controller.createUser).toBe('function');
    });
    it("should return json and 200 response code", async ()=>{
        addUser.mockReturnValue(new_user)
        await user_controller.createUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(new_user)
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in creating User'};
        const rejectedPromise = Promise.reject(errorMessage);
        addUser.mockReturnValue(rejectedPromise);
        await user_controller.createUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
})
describe("user_controller.updateUser", ()=>{
    it("should have a updateUser function", ()=>{
        expect(typeof user_controller.updateUser).toBe('function');
    });
    it("should return 200 response code", async ()=>{
        const update_message= {message: "Update Successfully"}
        editUser.mockReturnValue(update_message)
        await user_controller.updateUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(update_message)
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in updating User'};
        const rejectedPromise = Promise.reject(errorMessage);
        editUser.mockReturnValue(rejectedPromise);
        await user_controller.updateUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
})
describe("user_controller.deleteUser", ()=>{
    it("should have a deleteUser function", ()=>{
        expect(typeof user_controller.deleteUser).toBe('function');
    });
    it("should return 200 response code", async ()=>{
        req.query =  { id: 25 }
        await user_controller.deleteUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return 200 response code", async ()=>{
        const delete_message= {message: "Delete Successfully"}
        removeUser.mockReturnValue(delete_message)
        await user_controller.deleteUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(delete_message)
    })
    it("should handle errors", async () => {
        const errorMessage = {message: 'Error in updating User'};
        const rejectedPromise = Promise.reject(errorMessage);
        removeUser.mockReturnValue(rejectedPromise);
        await user_controller.deleteUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage)

    })
})