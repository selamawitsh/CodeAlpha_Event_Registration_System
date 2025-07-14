import { registerForEvent, getMyRegistations, cancelRegistration } from '../controllers/registration.controller.js';
import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', isAuthenticated, registerForEvent);
router.get('/my-registrations', isAuthenticated, getMyRegistations);
router.delete('/cancel/:id', isAuthenticated, cancelRegistration);

export default router;