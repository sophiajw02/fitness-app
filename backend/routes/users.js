import express from 'express';
import cors from 'cors';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();
router.use(cors());

// all routes in here are starting with /users
router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

// we might not need this due to our app not having a delete account button
router.delete('/:id', deleteUser);

export default router;