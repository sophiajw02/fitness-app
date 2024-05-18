import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5050;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    console.log('[TEST]!');
    
    res.send('Hello from Homepage.');
});

const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

// function to test adding user to db
const addUser = async (name, email) => {
    try {
      const documentRef = db.collection('users').doc(email);

      const data = {
        name: name,
        email: email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
  
      await documentRef.set(data, { merge: true });
  
      console.log('User added to Firestore successfully, ID:', email);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  };

// function to test adding workout to db
const addWorkout = async (email, workout) => {
    try {
      const documentRef = db.collection('workouts').doc();

      const data = {
        email: email,
        time: admin.firestore.FieldValue.serverTimestamp(),
        workout: workout
      };
  
      await documentRef.set(data, { merge: true });
  
      console.log('Workout added to Firestore successfully, ID:', documentRef.id);
    } catch (error) {
      console.error('Error adding workout to Firestore:', error);
    }
  };

// function to test user sign up
const userSignUp = async (email, password) => {
    try {
      await auth.createUser({
        email: email,
        password: password,
      });
      console.log('User signed up successfully:', email);
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };
  
const testWorkout = {
    bench: {
        weight: 135,
        reps: 10,
        sets: 5
    },
    squat: {
        weight: 135,
        reps: 10,
        sets: 5
    }
};

  addUser('John Adams', 'johnadams@gmail.com');
  addWorkout("johnadams@gmail.com", testWorkout);
  userSignUp("johnadams@gmail.com", "password123");

  app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));