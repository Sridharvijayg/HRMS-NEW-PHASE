const Employee = require('../Models/EmployeeModel');
const fs =  require('fs');
const path = require('path');

//Employee Pagination
const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const employees = await Employee.find().skip(skip).limit(limit).select('-password');

        const total = await Employee.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(total / limit);

        // Respond with paginated employees
        res.status(200).json({
            page,
            limit,
            totalPages,
            totalEmployees: total,
            employees
        });
    } catch (err) {
        console.error('Error fetching employee list:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//Search employee
const searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search parameter is required' });
        }

        let searchCriteria = {};

        // Check if query is a valid number (to assume it's an employeeId)
        if (!isNaN(query)) {
            searchCriteria.employeeId = query;
        } else {
            // If it's not a number, assume it's a name and search with a partial match (case-insensitive)
            searchCriteria.name = { $regex: query, $options: 'i' };
        }

        // Find employees that match the search criteria
        const employees = await Employee.find(searchCriteria).select('-password'); // Exclude sensitive fields like password

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        // Return the found employees
        res.status(200).json({ employees });

    } catch (err) {
        console.error('Error searching for employees:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get one employee by ID
const getEmployeebyId = async (req, res) => {
    try{
      const { employeeId } = req.params
      const getEmployeebyId = await Employee.findOne({ employeeId });
      // If employee not present
      if(!getEmployeebyId) {
        return res.status(500).json({message: "Employee Not Found!"});
      }
      res.status(200).json(getEmployeebyId);
    }
    catch(err){
      console.log(err);
      res.status(500).json({ message: "Error getting employee" });
    }
  };
  
  //Post employee
  const addEmployee = async (req, res) => {
    try {
      const { employeeId, name, email, position, department, dob, gender, contact, address } = req.body;
      const profilePictureUrl = `http://localhost:5000/public/uploads/${req.file.filename}`;
  
      // Check if employee with the same employeeId already exists
      const existingEmployee = await Employee.findOne({ employeeId });
  
      if (existingEmployee) {
        return res.status(400).json({ message: "Employee ID already exists" });
      }
  
      // Create new employee object
      const newEmployee = new Employee({
        employeeId, name, email, position, department, dob, gender, contact, address, profilePictureUrl
      });
  
      // Save employee details to the database
      await newEmployee.save();
      res.status(200).json({ message: "Employee added successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding employee" });
    }
  };
  
  module.exports = { addEmployee };
  
  
  //Update employee
  const updateEmployee = async (req,res) => {
      try{
        const { employeeId } = req.params;

        const { name, email, position, department, dob, gender, contact, address} = req.body;
        // check if profile picture was uploaded or not
        let profilePictureUrl = req.file ? `http://localhost:5000/public/uploads/${req.file.filename}` : undefined;
        //Find employee by ID
        const updateEmployee = await Employee.findOne({ employeeId });
        // If employee id is wrong
        if(!updateEmployee) {
            return res.status(404).json({message: "Employee Not Found!!"})
        }
        //Update employee details
        updateEmployee.name = name || updateEmployee.name;
        updateEmployee.email = email || updateEmployee.email;
        updateEmployee.position = position || updateEmployee.position;
        updateEmployee.department = department || updateEmployee.department;
        updateEmployee.dob = dob || updateEmployee.dob;
        updateEmployee.gender = gender || updateEmployee.gender;
        updateEmployee.contact = contact || updateEmployee.contact;
        updateEmployee.address = address || updateEmployee.address;

        if(profilePictureUrl){
            if(updateEmployee.profilePictureUrl){
                const oldFilePath = path.join(__dirname, '..', profilePictureUrl)
                if(fs.existsSync(oldFilePath)){
                    fs.unlinkSync(oldFilePath);
                }
            }
            updateEmployee.profilePictureUrl = profilePictureUrl;
        }
        //Save updated employee
        await updateEmployee.save();
        //Success Message
        res.status(200).json({message: "Employee details updated successfully!!"})
      }
      catch(err) {
        console.log(err);
        res.status(500).json({message: 'Error updating employee!'})
      }
  };

  //Delete employee
const deleteEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params; // Get employeeId from URL params
  
      // Find and delete the employee by employeeId
      const deletedEmployee = await Employee.findOneAndDelete({ employeeId });
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error Deleting Employee!"});
    }
  };
  
  
  module.exports = { getEmployees, searchEmployees, getEmployeebyId, addEmployee, updateEmployee, deleteEmployee };
