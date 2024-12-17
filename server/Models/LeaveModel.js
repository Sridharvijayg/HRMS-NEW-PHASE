const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveId: { 
    type: String, 
    unique: true, 
    required: true 
},
  employeeId: { 
    type: String, 
    required: true 
},
  name: {
     type: String, 
     required: true 
    },
  fromDate: { 
    type: Date, 
    required: true 
},
  toDate: { 
    type: Date, 
    required: true 
},
  noOfDays: { 
    type: Number, 
    required: true 
},
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Disapproved'], 
    default: 'Pending' 
},
  remainingDays: { 
    type: Number, 
    default: 3
 },
  reason: { 
    type: String 
},
  comment: { 
    type: String 
},
  month: { 
    type: String, 
    required: true 
},
  year: { 
    type: String, 
    required: true 
}, 
});

module.exports = mongoose.model('Leave', leaveSchema);