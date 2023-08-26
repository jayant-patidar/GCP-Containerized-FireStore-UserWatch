const express = require('express');
const cors = require('cors');
const app = express();

/*
Author : jayant Patidar
Description : This file handles the API requests for the register page.
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
  credential: fs.credential.cert(serviceAccount),
});

// Initialize Firestore database
const db = fs.firestore();

// Route to handle user registration
app.post('/register', async (req, res) => {
  try {
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      location: req.body.location,
    };
    const stateJson = {
      email: req.body.email,
      status: 'offline',
      lastLogin: new Date(),
      lastLogout: new Date(),
    };

    const userRef = db.collection('reg').doc(id);
    const userDoc = await userRef.get();

    //check if user already exists
    if (userDoc.exists) {
      return res.status(400).json({ error: 'User already exists' });
    } else {
      await userRef.set(userJson);
      await db.collection('state').doc(id).set(stateJson);
      return res.send('Registration successful');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
});

// Start the server
const port = process.env.PORT || 7001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
