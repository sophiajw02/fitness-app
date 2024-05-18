import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../config/firebaseConfig.js';

export const getAllUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(users);
    } catch (error) {
        res.status(500).send('Error getting users: ' + error.message);
    }
};

export const getUser = async (req, res) => {
    const { username, password } = req.params;
    try {
        const doc = await db.collection('users').doc(username).get();
        if (!doc.exists) {
            res.status(404).send('User not found');
        } else {
            const userData = doc.data();
            if (userData.password != password) {
                res.status(401).send('Incorrect password');
            } else {
                res.send({ username: doc.username, ...userData });
            }
        }
    } catch (error) {
        res.status(500).send('Error getting user: ' + error.message);
    }
};

export const createUser = async (req, res) => {
    const user = req.body;
    const userId = uuidv4();
    try {
        await db.collection('users').doc(userId).set({ ...user, id: userId });
        res.send(`User with the name ${user.fullName} added to DB!`);
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, username } = req.body;
    try {
        const userRef = db.collection('users').doc(id);
        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (username) updateData.username = username;
        await userRef.update(updateData);
        res.send(`User with the id ${id} has been updated`);
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
};

// dont have a delete account button
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('users').doc(id).delete();
        res.send(`User with the id ${id} deleted from the database.`);
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
};
