/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../../../../app');

jest.setTimeout(100000);

describe('testing for user get end point', () => {
   test('testing response from get all users', async () => {
      const res = await request(app).get('/api/v1/user').expect(200);
   });
});

describe('testing for user post end point', () => {
   const testUser = {
      username: 'testUser17',
      password: 'tesyuser17',
      confirmPassword: 'tesyuser17',
      email: 'test17@test.com',
   };

   test('testing response for create user', async () => {
      const res = await request(app)
         .post('/api/v1/user')
         .send(testUser)
         .expect('Content-Type', /json/)
         .expect(201);
   });
});

//error case
describe('testing for user already exist post end point', () => {
   const testUser = {
      username: 'testUser13',
      password: 'tesyuser13',
      confirmPassword: 'tesyuser13',
      email: 'test13@test.com',
   };

   test('testing error', async () => {
      const res = await request(app)
         .post('/api/v1/user')
         .send(testUser)
         .expect('Content-Type', /json/)
         .expect(400);

      expect(res.body.message).toStrictEqual('User already Exists');
   });
});
