import express from 'express';

import { createEvents, getEvents, updateEvents, deleteEvents } from '../controllers/event.js';

const router = express.Router();

router.post('/', createEvents);
router.get('/', getEvents);
router.patch('/:id', updateEvents); //editing the event
router.delete('/:id', deleteEvents); //deleting the event

export default router;