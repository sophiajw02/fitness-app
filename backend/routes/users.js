import express from 'express';

import { getAllUsers, getUser, createUser, updateUser } from '../controllers/users.js';

const router = express.Router();

// all routes in here are starting with /users
router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

// we might not need this due to our app not having a delete account button
//router.delete('/:id', deleteUser);

export default router;