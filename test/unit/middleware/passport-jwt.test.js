const { passport_jwt_strategy } = require('../../../src/middlewares/passport-jwt');
const httpMocks = require("node-mocks-http");
let req, res, next;

next = jest.fn()

describe("passport_jwt_strategy test", ()=>{
    it("should be a function", ()=>{
        expect(typeof passport_jwt_strategy).toBe('function');
    });
    it("should run next with jwt_payload", async () => {      
        await passport_jwt_strategy('payload', next);
        expect(next).toBeCalledWith('payload');
        
    })
    it("should run next with false", async () => {      
        await passport_jwt_strategy(false, next);
        expect(next).toBeCalledWith(false);
        
    })
})
