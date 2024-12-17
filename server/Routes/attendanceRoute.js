const express = require('express');
const router = express.Router();
const AttendanceController = require('../Controllers/attendanceController')

router.post('/check-in',AttendanceController.checkIn);
router.post('/check-out',AttendanceController.checkOut );
router.get('/attendance-report/:employeeId',AttendanceController.attendanceReport);
router.get('/attendance-report',AttendanceController.getAllEmployeeAttendanceByDate);

module.exports = router;


