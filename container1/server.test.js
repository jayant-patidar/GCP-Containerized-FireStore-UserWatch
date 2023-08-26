const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./server');

/*
Author : jayant Patidar
Description : test file for container 1
referenced from: 
[1] S. Raphael, "Testing a node/express application with Mocha &amp; Chai," Medium.com.[online]. Available: https://asciidev.medium.com/testing-a-node-express-application-with-mocha-chai-9592d41c0083 (Accessed: 01 July 2023). 
*/

// Test suite for POST /register
describe('POST /register', () => {
  it('should register a new user', (done) => {
    const newUser = {
      name: 'ram',
      email: 'ram@dal.ca',
      password: 'ram@12345678',
      location: 'Ayodhya',
    };

    request(app)
      .post('/register')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Registration successful');
        done();
      });
  }).timeout(10000); // Increase timeout to 10000 milliseconds to account for potential delays

  it('should return an error if the user already exists', (done) => {
    const existingUser = {
      name: 'Shyam',
      email: 'shyam@dal.ca',
      password: 'shyam@12345678',
      location: 'dwarika',
    };

    request(app)
      .post('/register')
      .send(existingUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('User already exists');
        done();
      });
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  // After hook to exit the process and end the test suite
  after((done) => {
    setTimeout(function () {
      process.exit(0);
    }, 11000); // Delay execution for 11000 milliseconds before exiting
    done();
  });
});
