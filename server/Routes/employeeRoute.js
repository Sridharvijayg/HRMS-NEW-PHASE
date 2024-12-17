const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthMiddleware = require('../Middleware/authMiddleware')
const Employee = require('../Controllers/employeeController');
const multer = require('multer');
const path = require('path');

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Save files in the /public/uploads folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
  });
  
  const upload = multer({ storage });

router.get('/page',Employee.getEmployees); // Get employee in pagination
router.get('/search',Employee.searchEmployees); // Search employee
router.get('/view/:employeeId', Employee.getEmployeebyId); //Get one employee by Id
router.post('/', upload.single('profilePictureUrl'),Employee.addEmployee); // Add new employee
router.put('/:employeeId', upload.single('profilePictureUrl'),Employee.updateEmployee) // Update employee details
router.delete('/:employeeId', Employee.deleteEmployee); // Delete employee


module.exports = router;