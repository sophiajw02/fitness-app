import express from 'express';

import { getAllWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workouts.js';

const router = express.Router();

// all routes in here are starting with /users
router.get('/:username', getAllWorkouts);

// router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.patch('/:id', updateWorkout);

// we might not need this due to our app not having a delete account button
router.delete('/:id', deleteWorkout);

export default router;