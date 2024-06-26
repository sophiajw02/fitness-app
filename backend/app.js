import express from 'express';
import bodyParser from 'body-parser';

// Import Firebase initialization
import { initializeFirebase, db, auth } from './config/firebaseConfig.js';

// Import APIs
import usersRoutes from './routes/users.js';
import workoutRoutes from './routes/workouts.js';

const app = express();
const PORT = 5050;

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/workouts', workoutRoutes);

// Initialize Firebase and then start the server
initializeFirebase().then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
}).catch(error => {
    console.error('Failed to initialize Firebase:', error);
});