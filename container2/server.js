const express = require('express');
const cors = require('cors');
const app = express();

/*
Author : jayant Patidar
Description : This file handles the API requests for the login page.
References:
[1] "4.X API Express 4.x - API Reference" expressjs.org. [online]. Available: https://expressjs.com/en/api.html (Accessed: 01 July 2023).
[2] K. zenwraight, "Crud with firestore using the node.js SDK," Medium.com. [online] Available: https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc (Accessed: 01 July 2023).
*/

// Load service account credentials for Firebase
const serviceAccount = require('./serverless-assignment2-391215-adfcc538e333.json');

// Middleware setup
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const fs = require('firebase-admin');
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});

// Initialize Firestore database
const db = fs.firestore();

// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    // Query the user document with the given email
    const userSnapshot = await db.collection('reg').doc(email).get();

    // Check if the user exists
    if (!userSnapshot.exists) {
      return res.status(404).send('User not found');
    }

    // Get the user data from the document
    const userData = userSnapshot.data();

    // Check if the password matches
    if (userData.password !== password) {
      return res.status(401).send('Invalid password');
    }

    const stateSnapshot = await db.collection('state').doc(email).get();
    const stateData = stateSnapshot.data();

    const stateRef = db.collection('state').doc(email);
    await stateRef.update({
      status: 'online',
      lastLogin: new Date(),
    });

    console.log(`User found ${userData.email} ${userData.location} ${userData.name} with status: ${stateData.status} last login: ${stateData.lastLogin} last logout: ${stateData.lastLogout}`);

    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
const port = process.env.PORT || 7002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
