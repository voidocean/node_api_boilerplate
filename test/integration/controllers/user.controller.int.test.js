const request = require('supertest');
const app = require('../../../src/app')
const new_user = require('../../mock-data/user/new_user.json')
let newUserId;
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
  it("should return 200 in POST to "+ endpointURL, async () => {
      const response = await request(app)
          .post(endpointURL)
          .send(new_user)
      expect(response.statusCode).toBe(200);
      expect(response.body.fullName).toBe(new_user.fullName);
      expect(response.body.email).toBe(new_user.email);
      newUserId = response.body.id;
  })
  it("should return 404 POST to "+ endpointURL, async () => {
    const response = await request(app)
        .post(endpointURL)
        .send()
    expect(response.statusCode).toBe(422);
  })
})
describe(endpointURL, ()=>{
    it("GET "+ endpointURL, async () => {
        const response = await request(app)
            .get(endpointURL+newUserId)
        expect(response.statusCode).toBe(200);
        expect(response.body.fullName).toBe(new_user.fullName);
        expect(response.body.email).toBe(new_user.email);
        
    })
})
describe(endpointURL, ()=>{
  it("DELETE "+ endpointURL+newUserId, async () => {
      const response = await request(app)
          .delete(endpointURL+newUserId)
      expect(response.statusCode).toBe(200);
  })
})