const { errorHandling } = require('../../../src/middlewares/errorHandling');
const httpMocks = require("node-mocks-http");
let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})


describe("errorHandling test", ()=>{
    it("should be a function", ()=>{
        expect(typeof errorHandling).toBe('function');
    });
    it("should get an error", async () => {      
        const errorMessage = {message: 'Error in updating User'};
        await errorHandling(errorMessage, req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage)  
    })
    it("should get an error code 404", async () => {      
        const errorMessage = { statusCode: 404, message: 'Error in updating User'};
        await errorHandling(errorMessage, req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toStrictEqual({message: errorMessage.message})  
    })

})
