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
