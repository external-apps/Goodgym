const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/server');
const request = supertest(app);
const expect = chai.expect;

describe('GET /:id', function() {
  it('returns 200 status', function(done) {
    request
      .get('/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});

describe('GET /qr/:id', function() {
  it('returns 200 status', function(done) {
    request
      .get('/qr/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});

describe('GET /task-sheet/:id', function() {
  it('returns 200 status', function(done) {
    request
      .get('/task-sheet/run123')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});
