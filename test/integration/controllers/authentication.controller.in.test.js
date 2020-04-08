const request = require('supertest');
const app = require('../../../src/app')
const new_user = require('../../mock-data/user/new_user.json')

const loginEndpointURL = "/login/";
const checkTokenEndpointURL = "/checkToken/";
const login_data = {email: 'john@email.com', password: 'password'}
const wrong_login_data = {email: 'john@email.com', password: 'passwords'}
let newToken;
describe(loginEndpointURL, ()=>{
    it("should return token and 200 in POST to "+ loginEndpointURL, async () => {
        const response = await request(app)
            .post(loginEndpointURL)
            .send(login_data)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token')
        newToken = response.body.token;      
    })
    it("should return 401 in POST to "+ loginEndpointURL, async () => {
        const response = await request(app)
            .post(loginEndpointURL)
            .send(wrong_login_data)
        expect(response.statusCode).toBe(401);
    })
})

describe(checkTokenEndpointURL, ()=>{
    it("should return token and 200 in get to "+ checkTokenEndpointURL, async () => {
        const response = await request(app)
            .get(checkTokenEndpointURL)
            .set({'authorization': "Bearer "+newToken})
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token')
    })
    it("should return 403 in get to "+ checkTokenEndpointURL, async () => {
        const response = await request(app)
            .get(checkTokenEndpointURL)
            .set({'authorization': newToken+'1'})
        expect(response.statusCode).toBe(403);
    })
})