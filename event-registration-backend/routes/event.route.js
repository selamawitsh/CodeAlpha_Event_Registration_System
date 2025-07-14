import express from 'express';
import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/event.controller.js';
import { isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllEvents); // List all events
router.get('/:id', getEventById); // Get single event by ID
router.post('/', isAdmin, createEvent); // Create event (admin only)
router.put('/:id', isAdmin, updateEvent); // Update event (admin only)
router.delete('/:id', isAdmin, deleteEvent); // Delete event (admin only)

export default router;