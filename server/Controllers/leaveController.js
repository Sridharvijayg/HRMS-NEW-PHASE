const { v4: uuidv4 } = require('uuid'); // Import uuid
const Leave = require('../Models/LeaveModel');

const checkRemainingLeaves = async (employeeId, month, year) => {
  const leavesThisMonth = await Leave.aggregate([
    { $match: { employeeId, month, year, status: 'Approved' } },
    { $group: { _id: null, totalDays: { $sum: '$noOfDays' } } },
  ]);

  const totalTakenDays = leavesThisMonth.length > 0 ? leavesThisMonth[0].totalDays : 0;
  const remainingDays = Math.max(3 - totalTakenDays, 0); // 3 days per month
  return remainingDays;
};

const calculateLeaveDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
  
    // If fromDate and toDate are the same, return 1 day
    if (start.getTime() === end.getTime()) {
      return 1;
    }
  
    let noOfDays = 0;
    let currentDate = start;
  
    // Regular logic for date range
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday
      if (dayOfWeek !== 0 && dayOfWeek !== 1) { // Exclude Sundays and Mondays
        noOfDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return noOfDays;
  };
  
  


  const raiseLeave = async (req, res) => {
    try {
      const { employeeId, name, fromDate, toDate, reason } = req.body;
  
      // Calculate number of leave days excluding Sundays and Mondays
      const noOfDays = await calculateLeaveDays(fromDate, toDate);
  
      const month = new Date(fromDate).getMonth() + 1; // Get month from date
      const year = new Date(fromDate).getFullYear(); // Get year from date
  
      // Check existing leave days taken this month
      const existingLeaves = await Leave.aggregate([
        { $match: { employeeId, month: month.toString(), year: year.toString(), status: 'Approved' } },
        { $group: { _id: null, totalDays: { $sum: '$noOfDays' } } },
      ]);
  
      const totalTakenDays = existingLeaves.length > 0 ? existingLeaves[0].totalDays : 0;
      const remainingDays = Math.max(3 - totalTakenDays, 0); // Assuming 3 leave days available per month
  
      // Check if remaining days are sufficient for the requested leave
      if (remainingDays < noOfDays) {
        // Allow the leave but mark as extra leave
        const leaveId = uuidv4();
        const leave = new Leave({
          leaveId,
          employeeId,
          name,
          reason,
          fromDate,
          toDate,
          noOfDays,
          month: month.toString(),
          year: year.toString(),
          remainingDays: remainingDays - noOfDays // Set remaining days accordingly
         
        });
  
        await leave.save();
  
        return res.status(200).json({
          message: 'Leave request raised successfully with extra leave.',
          leave,
          remainingDays: remainingDays - noOfDays
        });
      }
  
      // If sufficient remaining days, process normally
      const leaveId = uuidv4();
      const leave = new Leave({
        leaveId,
        employeeId,
        name,
        reason,
        fromDate,
        toDate,
        noOfDays,
        month: month.toString(),
        year: year.toString(),
        remainingDays: remainingDays - noOfDays, // Update remaining days after applying leave
      });
  
      await leave.save();
  
      res.status(200).json({
        message: 'Leave request raised successfully.',
        leave,
        remainingDays: remainingDays - noOfDays
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
    
  

// Admin changes leave status
const changeLeaveStatus = async (req, res) => {
    try {
      const { leaveId, status, comment } = req.body;
  
      const leave = await Leave.findOne({ leaveId: leaveId });
  
      if (!leave) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      leave.status = status;
      leave.comment = comment || leave.comment; // Add or update comment
      await leave.save();
  
      // Calculate remaining leaves after the status change
      const month = leave.month;
      const year = leave.year;
      const remainingDays = await checkRemainingLeaves(leave.employeeId, month, year);
  
      res.status(200).json({ 
        message: 'Leave status updated successfully', 
        leave, 
        remainingDays: remainingDays 
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const getAllLeaves = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
      const skip = (page - 1) * limit; // Calculate how many documents to skip
  
      const leaves = await Leave.find()
        .sort({ fromDate: -1 }) // Sort by fromDate in descending order
        .skip(skip) // Skip the previous pages
        .limit(limit); // Limit the number of results returned
  
      const totalLeaves = await Leave.countDocuments(); // Get the total number of leaves
  
      res.status(200).json({
        message: 'Leave requests retrieved successfully',
        leaves,
        totalLeaves,
        totalPages: Math.ceil(totalLeaves / limit), // Calculate total pages
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  const getLeavesByEmployeeId = async (req, res) => {
    try {
      const employeeId = req.params.employeeId; // Get employeeId from URL parameters
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
      const skip = (page - 1) * limit; // Calculate how many documents to skip
  
      // Fetch leave requests for a specific employee, sorted in descending order
      const leaves = await Leave.find({ employeeId })
        .sort({ fromDate: -1 }) // Sort by fromDate in descending order
        .skip(skip) // Skip the previous pages
        .limit(limit); // Limit the number of results returned
  
      // Get the total count of leave requests for the employee
      const totalLeaves = await Leave.countDocuments({ employeeId });
  
      // Return response
      res.status(200).json({
        message: 'Leave requests retrieved successfully',
        leaves,
        totalLeaves,
        totalPages: Math.ceil(totalLeaves / limit), // Calculate total pages
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const deleteLeaveByLeaveId = async (req, res) => {
    try {
      const leaveId = req.params.leaveId; // Get leaveId from URL parameters
  
      // Find the leave request by leaveId and delete it
      const deletedLeave = await Leave.findOneAndDelete({ leaveId });
  
      if (!deletedLeave) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      res.status(200).json({ message: 'Leave request deleted successfully', deletedLeave });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const getLeaveByLeaveId = async (req, res) => {
    try {
      const leaveId = req.params.leaveId; // Get the leaveId from the request parameters
  
      // Fetch the leave record by leaveId
      const leave = await Leave.findOne({ leaveId });
  
      // Check if the leave record exists
      if (!leave) {
        return res.status(404).json({ message: 'Leave record not found' });
      }
  
      // Return the leave record
      return res.status(200).json(leave);
    } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({ message: 'Server error', error });
    }
  };
module.exports = {raiseLeave,changeLeaveStatus,getAllLeaves,getLeavesByEmployeeId,deleteLeaveByLeaveId,getLeaveByLeaveId}