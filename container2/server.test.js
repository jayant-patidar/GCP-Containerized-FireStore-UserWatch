const request = require('supertest');
const app = require('./server');
const { expect } = require('chai');

/*
Author : jayant Patidar
Description : test file for container 2
referenced from: 
[1] S. Raphael, "Testing a node/express application with Mocha &amp; Chai," Medium.com.[online]. Available: https://asciidev.medium.com/testing-a-node-express-application-with-mocha-chai-9592d41c0083 (Accessed: 01 July 2023). 
*/

// Test suite for POST /login
describe('POST /login', () => {
  it('should login a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'ram@dal.ca', // User exists
        password: 'ram@12345678', // Correct password
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('email');
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('location');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  it('should return an error if email and password are not provided', async () => {
    const response = await request(app).post('/login').send({});

    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Email and password are required');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  it('should return an error if user is not found', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'jayant@dal.ca', // This user does not exist
        password: 'jayant@12345',
      });

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('User not found');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  it('should return an error if password is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'ram@dal.ca', // Correct email for existing user
        password: 'ram@987654', // This is the wrong password for the existing user
      });

    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Invalid password');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  // After hook to exit the process and end the test suite
  after((done) => {
    setTimeout(function () {
      process.exit(0);
    }, 11000); // Delay execution for 11000 milliseconds before exiting
    done();
  });
});
