//const { getUserByID, addUser, editUser, removeUser  } = require('../../../../src/domains/user/user.flows');
const user_flows = require('../../../../src/domains/user/user.flows');
const { fetchUser, insertUser, updateUser, deleteUser, encryptPassword } = require('../../../../src/domains/user/user.services');
const new_user = require('../../../mock-data/user/new_user.json')
jest.mock('../../../../src/domains/user/user.services')

let user_id = 1

describe("user_flows.getUserByID", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_flows.getUserByID).toBe('function');
    });
    it("should get an user", async () => {      
        fetchUser.mockReturnValue(new_user)
        const result =  await user_flows.getUserByID(user_id);
        expect(fetchUser).toBeCalledWith(user_id)
        expect(result).toStrictEqual(new_user)
    })
    it("should return empty if no id was provided", async () => {
        fetchUser.mockReturnValue({})
        const no_result =  await user_flows.getUserByID(undefined);
        expect(fetchUser).toBeCalledWith(undefined)
        expect(no_result).toStrictEqual({})
    })
})

describe("user_flows.addUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_flows.addUser).toBe('function');
    });
    it("should create an user", async () => {
        insertUser.mockReturnValue(new_user)
        encryptPassword.mockReturnValue("password")
        const result =  await user_flows.addUser(new_user);
        expect(insertUser).toBeCalledWith(new_user)
        expect(result).toStrictEqual(new_user)
    })
})

describe("user_flows.editUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_flows.editUser).toBe('function');
    });
    it("should update an user", async () => {
        updateUser.mockReturnValue(1)
        const result =  await user_flows.editUser({ id: user_id, fullName: new_user.fullName, email: new_user.email });
        expect(updateUser).toBeCalledWith(user_id, { fullName: new_user.fullName, email: new_user.email })
        expect(result).toStrictEqual({"message":"successful"})
    })
    it("should handle an error if update failed", async () => {
        updateUser.mockReturnValue(0)
        const result =  await user_flows.editUser({ id: user_id, fullName: new_user.fullName, email: new_user.email });
        expect(updateUser).toBeCalledWith(user_id, { fullName: new_user.fullName, email: new_user.email })
        expect(result).toStrictEqual({"message":"failed"})
    })
    
})

describe("user_flows.editUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_flows.removeUser).toBe('function');
    });
    it("should delete an user", async () => {      
        deleteUser.mockReturnValue(new_user)
        const result =  await user_flows.removeUser(user_id);
        expect(deleteUser).toBeCalledWith(user_id)
        expect(result).toStrictEqual(new_user)
    })
    it("should return empty if no id was provided", async () => {
        deleteUser.mockReturnValue({})
        const no_result =  await user_flows.removeUser(undefined);
        expect(deleteUser).toBeCalledWith(undefined)
        expect(no_result).toStrictEqual({})
    })
})

