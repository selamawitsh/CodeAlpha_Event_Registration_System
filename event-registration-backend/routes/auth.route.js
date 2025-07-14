import express from 'express';
import {registerUser, LoginUser, getAllUsers} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', LoginUser);
router.get('/users', getAllUsers);

export default router;