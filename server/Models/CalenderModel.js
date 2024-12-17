const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  startDate: {
    type: Date,
   
  },
  endDate: {
    type: Date,
   
  },
  title: {
    type: String,
    
  },
  description: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
