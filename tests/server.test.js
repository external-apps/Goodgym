const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/server');
const request = supertest(app);
const expect = chai.expect;

process.env.NODE_ENV = 'testing';

describe('GET /', () => {
  it('returns 200 status', (done) => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /login', () => {
  it('returns 200 status', (done) => {
    request
      .get('/login')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /confirmation', () => {
  it('returns 200 status', (done) => {
    request
      .get('/confirmation')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /qr/:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/qr/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /task-sheet/:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/task-sheet/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /get-run/:id', () => {
  it('returns 200 status', (done) => {
    request
      .get('/get-run/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('POST /post-run/:id', () => {
  it('returns 200 status', (done) => {
    request
      .post('/post-run/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('POST /send-qr-email/:id', () => {
  it('returns 200 status', (done) => {
    request
      .post('/send-qr-email/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('POST /send-task-sheet/:id', () => {
  it('returns 200 status', (done) => {
    request
      .post('/send-task-sheet/570')
      .expect(200)
      .end((err, res) => {
        done(err);
      });
  });
});
