import { v4 as uuidv4 } from 'uuid';
import { db, auth, admin } from '../config/firebaseConfig.js';

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
    const { id } = req.params;
    try {
        const doc = await db.collection('users').doc(id).get();
        if (!doc.exists) {
            res.status(404).send('User not found');
        } else {
            res.send({ id: doc.id, ...doc.data() });
        }
    } catch (error) {
        res.status(500).send('Error getting user: ' + error.message);
    }
};

export const createUser = async (req, res) => {
    const user = req.body;
    const userId = uuidv4();
    try {
        await db.collection('users').doc(userId).set({ ...user, id: userId, created: admin.firestore.FieldValue.serverTimestamp()});
        res.send(`User with the name ${user.fullName} added to DB!`);
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
};

export const userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const querySnapshot = await db.collection('users').where('username', '==', username).get();

        if (querySnapshot.empty) {
            return res.status(401).send('User not found');
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password !== password) {
            return res.status(401).send('Incorrect password');
        }

        // Assuming your user documents have an ID field
        const userId = userDoc.id;

        res.json({ userID: userId });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

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
