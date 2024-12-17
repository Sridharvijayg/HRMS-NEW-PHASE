const express = require('express');
const router = express.Router();
const calendarController = require('../Controllers/calenderController');

router.post('/add', calendarController.addEvent);// Add a new event
router.get('/events', calendarController.getAllEvents);// Get all events
router.get('/events/:id', calendarController.getEventById);// Get event by ID
router.put('/events/:id', calendarController.updateEvent);// Update event by ID
router.delete('/events/:id', calendarController.deleteEvent);// Delete event by ID


module.exports = router;
