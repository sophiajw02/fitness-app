import express from 'express';
import cors from 'cors';

import { getAllWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workouts.js';

const router = express.Router();
router.use(cors());

// all routes in here are starting with /users
router.get('/:userid', getAllWorkouts);

// router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.patch('/:id', updateWorkout);

// we might not need this due to our app not having a delete account button
router.delete('/:id', deleteWorkout);

export default router;