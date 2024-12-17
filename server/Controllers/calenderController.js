const CalendarEvent = require('../Models/CalenderModel');

// Add new event
exports.addEvent = async (req, res) => {
  try {
    const { startDate, endDate, title, description } = req.body;

    // Check if start date is earlier than end date
    // if (new Date(startDate) > new Date(endDate)) {
    //   return res.status(400).json({ message: 'Start date must be earlier than end date' });
    // }

    const newEvent = new CalendarEvent({
      startDate,
      endDate,
      title,
      description
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Error adding event', error: err.message });
  }
};

// Get all events (with optional date range filtering)
exports.getAllEvents = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Optional date range filter

    // If a date range is provided, find events within that range
    let filter = {};
    if (startDate && endDate) {
      filter = {
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) }
      };
    }

    const events = await CalendarEvent.find(filter).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// Update event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { startDate, endDate, title, description } = req.body;

    // Check if start date is earlier than end date
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'Start date must be earlier than end date' });
    }

    const updatedEvent = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate, title, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};
