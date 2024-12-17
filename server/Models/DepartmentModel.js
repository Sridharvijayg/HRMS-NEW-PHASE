const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true 
    }
}, { timestamps: true });
    
const Department = new mongoose.model('Department',DepartmentSchema)

module.exports = Department;