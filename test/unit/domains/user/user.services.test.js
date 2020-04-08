const bcryptjs = require('bcryptjs')
const user_services = require('../../../../src/domains/user/user.services');
const { User } = require('../../../../src/models')
const new_user = require('../../../mock-data/user/new_user.json')

User.findOne = jest.fn();
User.create = jest.fn();
User.update = jest.fn();
User.destroy = jest.fn();

bcryptjs.hash = jest.fn();

let user_id = 1

describe("user_services.fetchUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_services.fetchUser).toBe('function');
    });
    it("should get an user", async () => {      
        User.findOne.mockReturnValue(new_user)
        const result =  await user_services.fetchUser(user_id);
        //expect(fetchUser).toBeCalledWith(user_id)
        expect(result).toStrictEqual(new_user)
    })
})

describe("user_services.insertUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_services.insertUser).toBe('function');
    });
    it("should create an user", async () => {
        User.create.mockReturnValue(new_user)
        
        const result =  await user_services.insertUser(new_user);
        //expect(insertUser).toBeCalledWith(new_user)
        expect(result).toStrictEqual(new_user)
    })
})

describe("user_services.updateUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_services.updateUser).toBe('function');
    });
    it("should update an user", async () => {
        User.update.mockReturnValue(1)
        const result =  await user_services.updateUser(user_id, { fullName: new_user.fullName, email: new_user.email });
        //expect(updateUser).toBeCalledWith(user_id, { fullName: new_user.fullName, email: new_user.email })
        expect(result).toStrictEqual(1)
    })
    it("should update failed", async () => {
        User.update.mockReturnValue(0)
        const result =  await user_services.updateUser(0, { fullName: new_user.fullName, email: new_user.email });
        //expect(updateUser).toBeCalledWith(user_id, { fullName: new_user.fullName, email: new_user.email })
        expect(result).toStrictEqual(0)
    })
})

describe("user_services.deleteUser", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_services.deleteUser).toBe('function');
    });
    it("should delete an user", async () => {      
        User.destroy.mockReturnValue(1)
        const result =  await user_services.deleteUser(user_id);
        expect(result).toStrictEqual(1)
    })
    it("should return empty if no id was provided", async () => {
        User.destroy.mockReturnValue(0)
        const no_result =  await user_services.deleteUser(undefined);
        
        expect(no_result).toStrictEqual(0)
    })
})

describe("user_services.encryptPassword", ()=>{
    it("should be a function", ()=>{
        expect(typeof user_services.encryptPassword).toBe('function');
    });
    it("should delete an user", async () => {      
        bcryptjs.hash.mockReturnValue('new password')
        const result =  await user_services.encryptPassword(new_user.password);
        expect(result).toStrictEqual('new password')
    })
})
