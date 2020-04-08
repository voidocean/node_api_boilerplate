const request = require('supertest');
const app = require('../../../src/app')
let server;

beforeAll(async (done) => {
  server = app.listen(4002, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll(async () => {
  await server.close();
});
const homeCheckEndpointURL = "/";
const healthCheckEndpointURL = "/healthcheck/";
describe(homeCheckEndpointURL, ()=>{
    it("GET "+ homeCheckEndpointURL, async () => {
        const response = await request(app).get(homeCheckEndpointURL)
        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("home");
        
    })
})
describe(healthCheckEndpointURL, ()=>{
    it("GET "+ healthCheckEndpointURL, async () => {
        const response = await request(app).get(healthCheckEndpointURL)
        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("Health Check");
        
    })
})