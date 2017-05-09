const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/server');
const request = supertest(app);
const expect = chai.expect;

describe('GET /:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});

describe('GET /qr/:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/qr/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});

describe('GET /task-sheet/:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/task-sheet/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});
