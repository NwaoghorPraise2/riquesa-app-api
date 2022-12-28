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
      username: 'testUser12',
      password: 'tesyuser12',
      confirmPassword: 'tesyuser12',
      email: 'test12@test.com',
   };

   test('testing response for create user', async () => {
      const res = await request(app)
         .post('/api/v1/user')
         .send(testUser)
         .expect('Content-Type', /json/)
         .expect(201);

      expect(res.body).toMatchObject(testUser);
   });
});
