const request = require('supertest');
const app = require('../../../src/app')
const new_user = require('../../mock-data/user/new_user.json')

let newUserId;
const endpointURL = "/user/";
const new_data = {fullName: 'will smith', email: 'will@email.com'}
describe(endpointURL, ()=>{
  it("should return user and 200 in POST to "+ endpointURL, async () => {
      const response = await request(app)
          .post(endpointURL)
          .send(new_user)
      expect(response.statusCode).toBe(200);
      expect(response.body.fullName).toBe(new_user.fullName);
      expect(response.body.email).toBe(new_user.email);
      newUserId = response.body.id;      
  })
  it("should return 422 POST to "+ endpointURL, async () => {
    const response = await request(app)
        .post(endpointURL)
        .send()
    expect(response.statusCode).toBe(422);
  })
  
  it("should return message and 200 in PUT to "+ endpointURL, async () => {
        const put_response = await request(app)
          .put(endpointURL+newUserId)
          .send(new_data)
        expect(put_response.statusCode).toBe(200);
        expect(put_response.body).toStrictEqual({ "message": "Update Successfully" });
  })
  it("GET "+ endpointURL + newUserId, async () => {
      
    const response = await request(app)
        .get(endpointURL+newUserId)
    expect(response.statusCode).toBe(200);
    expect(response.body.fullName).toBe(new_data.fullName);
    expect(response.body.email).toBe(new_data.email);
  })
  
  it("DELETE "+ endpointURL+newUserId, async () => {
      const response = await request(app)
          .delete(endpointURL+newUserId)
      expect(response.statusCode).toBe(200);
  })
})