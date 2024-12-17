// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.get('/',leaveController.getAllLeaves);
router.delete('/:leaveId',leaveController.deleteLeaveByLeaveId);
router.get('/:employeeId',leaveController.getLeavesByEmployeeId);
router.post('/raise-leave',leaveController.raiseLeave); 
router.put('/change-leave-status',leaveController.changeLeaveStatus);
router.get('/leave/:leaveId', leaveController.getLeaveByLeaveId);

module.exports = router;
