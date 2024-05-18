import { v4 as uuidv4 } from 'uuid';
import { db, auth, admin } from '../config/firebaseConfig.js';

export const getAllWorkouts = async (req, res) => {
    try {
        const {username} = req.params;
        const snapshot = await db.collection('workouts').where('username' , '==', username).get();
        const workouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(workouts);
    } catch (error) {
        res.status(500).send('Error getting workouts: ' + error.message);
        
    }
};

// export const getWorkout = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const doc = await db.collection('workouts').doc(id).get();
//         if (!doc.exists) {
//             res.status(404).send('User not found');
//         } else {
//             res.send({ id: doc.id, ...doc.data() });
//         }
//     } catch (error) {
//         res.status(500).send('Error getting workout: ' + error.message);
//     }
// };

export const createWorkout = async (req, res) => {
    const workout = req.body;
    const workoutId = uuidv4();
    try {
        await db.collection('workouts').doc(workoutId).set({ ...workout, id: workoutId, created: admin.firestore.FieldValue.serverTimestamp()});
        res.send(`Workout with the name ${workout.workoutName} added to DB!`);
    } catch (error) {
        res.status(500).send('Error creating workout: ' + error.message);
    }
};

export const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { exercises } = req.body;
    try {
        const workoutRef = db.collection('workouts').doc(id);
        const updateData = {};
        if (exercises) updateData.exercises = exercises;
        await workoutRef.update(updateData);
        res.send(`User with the id ${id} has been updated`);
    } catch (error) {
        res.status(500).send('Error updating workout: ' + error.message);
    }
};

// dont have a delete account button
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('workouts').doc(id).delete();
        res.send(`User with the id ${id} deleted from the database.`);
    } catch (error) {
        res.status(500).send('Error deleting workout: ' + error.message);
    }
};
