const request = require('supertest');
const app = require('../../../../app');

// eslint-disable-next-line no-undef
describe('testing for tours get end point', () => {
   // eslint-disable-next-line no-undef
   test('testing response from /get all tours', async () => {
      const res = await request(app).get('/api/v1/user');
      // eslint-disable-next-line no-undef
      expect(res);
   });
});
