const mongoose = require('mongoose');

// Define the schema for attendance
const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,  
        required: true,
        ref: 'Employee'
    },
    name: {
        type: String  
    },
    date: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10),  // Store date as YYYY-MM-DD
        required: true
    },
    checkInTimes: {
        type: [Date],  // Store multiple check-in times
        required: true,
        default: []
    },
    checkOutTimes: {
        type: [Date],  // Store multiple check-out times
        required: true,
        default: []
    },
    status: {
        type: String,
        enum: ['CheckIn', 'CheckOut', 'Absent','Present'],
        default: 'Absent',
        required: true
    },
    totalWorkHours: {
        type: String, 
        default: '00:00:00'
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
