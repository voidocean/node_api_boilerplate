const request = require('supertest');
const app = require('../../../src/app')
beforeAll(async (done) => {
    
    server = app.listen(4001, () => {
      global.agent = request.agent(server);
      done();
    });
  });
  
  afterAll(async () => {
    await server.close();
    
  });
const endpointURL = "/user/";
describe(endpointURL, ()=>{
    it("GET "+ endpointURL, async () => {
        const response = await request(app)
            .get(endpointURL+"57")
        expect(response.statusCode).toBe(200);
        //expect(response.body.message).toBe("successful");
        
    })
})