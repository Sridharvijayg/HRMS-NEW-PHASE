const moment = require('moment');
const Attendance = require('../Models/AttendanceModel');
const Employee = require('../Models/EmployeeModel');

const millisecondsToHHMMSS = (milliseconds) => {
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
};

const checkIn = async (req, res) => {
    const { employeeId } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date (YYYY-MM-DD)

    try {
        // Find today's attendance record for the employee
        let attendance = await Attendance.findOne({
            employeeId,
            date: currentDate,
        });

        // If no attendance record exists for today, create a new one
        if (!attendance) {
            attendance = new Attendance({
                employeeId,
                checkInTimes: [new Date()],
                status: 'CheckIn', // Only Present and Absent statuses
                date: currentDate,
            });
        } else {
            // Add a new check-in time if attendance record already exists
            attendance.checkInTimes.push(new Date());
        }

        await attendance.save();
        res.status(200).json({ message: 'Check-in successful', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Check-in failed', error });
    }
};

// Check-Out function
const checkOut = async (req, res) => {
    const { employeeId } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date (YYYY-MM-DD)

    try {
        // Find today's attendance record
        const attendance = await Attendance.findOne({
            employeeId,
            date: currentDate,
        });

        if (!attendance) {
            return res.status(404).json({ message: 'No check-in record found for today' });
        }

        // Add a new check-out time
        attendance.checkOutTimes.push(new Date());
        attendance.status = "CheckOut"

        // Calculate total work hours for the day
        let totalMilliseconds = 0;
        const checkInTimes = attendance.checkInTimes;
        const checkOutTimes = attendance.checkOutTimes;

        // Calculate work hours based on pairs of check-in and check-out times
        for (let i = 0; i < Math.min(checkInTimes.length, checkOutTimes.length); i++) {
            const checkInTime = new Date(checkInTimes[i]);
            const checkOutTime = new Date(checkOutTimes[i]);
            totalMilliseconds += Math.abs(checkOutTime - checkInTime);
        }

        // Convert total work hours to HH:MM:SS format
        const totalWorkHoursHHMMSS = millisecondsToHHMMSS(totalMilliseconds);

        attendance.totalWorkHours = totalWorkHoursHHMMSS;
        await attendance.save();

        res.status(200).json({ message: 'Check-out successful', totalWorkHours: totalWorkHoursHHMMSS, attendance });
    } catch (error) {
        res.status(500).json({ message: 'Check-out failed', error });
    }
};

// Attendance report function
const attendanceReport = async (req, res) => {
    const { employeeId } = req.params;
    const { startDate, endDate } = req.query;  // Optionally allow date range

    const filter = { employeeId };

    // If date range is provided, filter by start and end date
    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate).toISOString().slice(0, 10),
            $lte: new Date(endDate).toISOString().slice(0, 10)
        };
    }

    try {
        // Find attendance records based on filter
        const attendanceRecords = await Attendance.find(filter);

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Fetch employee details
        const employee = await Employee.findOne({ employeeId });

        // Add employee name to each record
        const recordsWithEmployeeName = attendanceRecords.map(record => ({
            ...record.toObject(),
            name: employee ? employee.name : 'Unknown'
        }));

        res.status(200).json(recordsWithEmployeeName);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance report', error });
    }
};


const getAllEmployeeAttendanceByDate = async (req, res) => {
    const { date } = req.query;

    // Use current date if no date is provided
    const targetDate = date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

    try {
        // Find attendance records for all employees on the specified date
        const attendanceRecords = await Attendance.find({ date: targetDate });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found for this date' });
        }

        // Extract employee IDs from attendance records
        const employeeIds = [...new Set(attendanceRecords.map(record => record.employeeId))];

        // Fetch employee details
        const employees = await Employee.find({ employeeId: { $in: employeeIds } });

        // Create a map of employee data for quick lookup
        const employeeMap = employees.reduce((map, employee) => {
            map[employee.employeeId] = employee.name;
            return map;
        }, {});

        // Determine status for each record and include employee name
        const updatedRecords = attendanceRecords.map(record => {
            const checkInTimes = record.checkInTimes;
            const checkOutTimes = record.checkOutTimes;

            if (checkInTimes.length === 0) {
                // No check-in record
                record.status = 'Absent';
            } else if (checkOutTimes.length < checkInTimes.length) {
                // Check-ins present but not enough check-outs
                record.status = 'CheckIn';
            } else {
                // Both check-ins and check-outs present
                record.status = 'Present';
            }

            // Add employee name to the record
            record.name = employeeMap[record.employeeId] || 'Unknown';

            return record;
        });

        // Optionally save updated status if required
        await Promise.all(updatedRecords.map(record => 
            Attendance.findOneAndUpdate(
                { _id: record._id },
                { status: record.status },
                { new: true }
            )
        ));

        res.status(200).json({
            message: 'Attendance records retrieved and updated successfully',
            attendanceRecords: updatedRecords,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching and updating attendance records', error });
    }
};



module.exports = { checkIn, checkOut, attendanceReport, getAllEmployeeAttendanceByDate};
