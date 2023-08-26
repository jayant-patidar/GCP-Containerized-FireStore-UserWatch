const express = require('express');
const cors = require('cors');
const app = express();

/*
Author : jayant Patidar
Description : this file handle the api request for home page. bring logged in user and the online users
referenced from: 
[1] "4.X API Express 4.x - API Reference"expressjs.org.[online]. Available: https://expressjs.com/en/api.html (Accessed: 01 July 2023). 
[2] K. zenwraight, "Crud with firestore using the node.js SDK," Medium.com. [online] Available: https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc (Accessed: 01 July 2023). 


*/

// Load service account credentials for Firebase
const serviceAccount = require('./serverless-assignment2-391215-adfcc538e333.json');

// Middleware setup
app.use(express.json());
app.use(cors());
const fs = require('firebase-admin');

// Initialize Firebase Admin SDK
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();
//returns the online users to home component
app.get('/home', async (req, res) => {
  try {
    // Query online users from Firestore
    const onlineUsersRef = db.collection('state').where('status', '==', 'online');
    const onlineUsersSnapshot = await onlineUsersRef.get();

    const onlineUsers = [];
    for (const doc of onlineUsersSnapshot.docs) {
      // Fetch user data from 'reg' collection
      const userDoc = await db.collection('reg').doc(doc.id).get();
      if (userDoc.exists) {
        onlineUsers.push(userDoc.data());
      }
    }

    res.send(onlineUsers);
  } catch (error) {
    console.error('Error fetching online users:', error);
    res.status(500).send('An error occurred while fetching online users');
  }
});
//handles logout, changes the status  to offline and record the log out time
app.post('/logout', async (req, res) => {
  try {
    const { email } = req.body;

    const stateDocRef = db.collection('state').doc(email);
    const stateDoc = await stateDocRef.get();

    // Update user status to 'offline' and record logout time
    if (stateDoc.exists) {
      await stateDocRef.update({
        status: 'offline',
        lastLogout: new Date()
      });
      res.send('Logout successful');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).send('An error occurred while updating user status');
  }
});


//exposing the port
const port = process.env.PORT || 7003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;