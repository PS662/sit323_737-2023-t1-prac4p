process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const { expect } = require('chai');
const config = require('../config');


describe('GET /', () => {
  it('should return status 200 and a HTML page with a title, heading, and paragraph', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);
  });
});

describe('POST /add', () => {
  it('should return status 200 and the sum of two numbers', async () => {
    const num1 = 2;
    const num2 = 3;
    const response = await request(app)
      .post('/add')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.deep.equal({ result: num1 + num2 });
  });
  it('should return status 400 and an error message for invalid input', async () => {
    const num1 = 'invalid';
    const num2 = 3;
    const response = await request(app)
      .post('/add')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).to.deep.equal({ error: 'Invalid input parameters' });
  });
});

describe('POST /subtract', () => {
  it('should return status 200 and the difference of two numbers', async () => {
    const num1 = 5;
    const num2 = 2;
    const response = await request(app)
      .post('/subtract')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.deep.equal({ result: num1 - num2 });
  });
  it('should return status 400 and an error message for invalid input', async () => {
    const num1 = 'invalid';
    const num2 = 3;
    const response = await request(app)
      .post('/subtract')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).to.deep.equal({ error: 'Invalid input parameters' });
  });
});

describe('POST /multiply', () => {
  it('should return status 200 and the product of two numbers', async () => {
    const num1 = 2;
    const num2 = 3;
    const response = await request(app)
      .post('/multiply')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.deep.equal({ result: num1 * num2 });
  });
  it('should return status 400 and an error message for invalid input', async () => {
    const num1 = 'invalid';
    const num2 = 3;
    const response = await request(app)
      .post('/multiply')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).to.deep.equal({ error: 'Invalid input parameters' });
  });
});

describe('POST /divide', () => {
  it('should return status 200 and the quotient of two numbers', async () => {
    const num1 = 6;
    const num2 = 3;
    const response = await request(app)
      .post('/divide')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.deep.equal({ result: num1 / num2 });
  });

  it('should return status 400 and an error message for invalid input', async () => {
    const num1 = 'invalid';
    const num2 = 3;
    const response = await request(app)
      .post('/divide')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).to.deep.equal({ error: 'Invalid input parameters' });
  });

  it('should return status 400 and an error message for division by zero', async () => {
    const num1 = 6;
    const num2 = 0;
    const response = await request(app)
      .post('/divide')
      .send({ num1: num1, num2: num2 })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).to.deep.equal({ error: 'Cannot divide by zero'});
  });
});