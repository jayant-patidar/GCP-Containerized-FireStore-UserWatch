const request = require('supertest');
const app = require('./server');
const { expect } = require('chai'); 
/*

Author : jayant Patidar
Description : test file for container 3
referenced from: 
[1] S. Raphael, "Testing a node/express application with Mocha &amp; Chai," Medium.com.[online]. Available: https://asciidev.medium.com/testing-a-node-express-application-with-mocha-chai-9592d41c0083 (Accessed: 01 July 2023). 

*/
// Test suite for GET /home
describe('GET /home', () => {
  it('should get online users', async () => {
    const response = await request(app).get('/home');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  // After hook to exit the process and end the test suite
  after((done) => {
    setTimeout(function () {
      process.exit(0);
    }, 11000); // Delay execution for 11000 milliseconds before exiting
    done();
  });
});

// Test suite for POST /logout
describe('POST /logout', () => {
  it('should logout a user', async () => {
    const response = await request(app)
      .post('/logout')
      .send({
        email: 'ram@dal.ca',
      });

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Logout successful');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays

  it('should return an error if user is not found', async () => {
    const response = await request(app)
      .post('/logout')
      .send({
        email: 'jayant@dal.ca',
      });

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('User not found');
  }).timeout(100000); // Increase timeout to 100000 milliseconds to account for potential delays
  
  // After hook to exit the process and end the test suite
  after((done) => {
    setTimeout(function () {
      process.exit(0);
    }, 11000); // Delay execution for 11000 milliseconds before exiting
    done();
  });
});
