const request = require('supertest');
const app = require('../../../src/app')

const endpointURL = "/user";
describe(endpointURL, ()=>{
    it("GET "+ endpointURL, async () => {
        const response = await request(app)
            .get(endpointURL)
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("successful");
        
    })
})