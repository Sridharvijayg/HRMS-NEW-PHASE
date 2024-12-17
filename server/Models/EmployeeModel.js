const mongoose = require('mongoose')

    const LoginSchema = new mongoose.Schema({
        employeeId: {
            type: String,
            required: true,
            unique:true  
        },
        name: {
            type: String,
            required: true  
        },
        email: {
            type: String,
            required: true  
        },
        password: {
            type: String,
            default: "$2a$10$Ozg5Kjca5EhyLzsf4Y5TF.IMrCX7LNElRb6/XpGRoowGhud3kXCnu" //password:"enchhash"
        },
        position: {
            type:String
            // required: true
        },
        department: {
            type:String
            // required: true
        },
        dob: {
            type:Date
            // required: true
        },
        contact:{
            type:String
            // required: true
        },
        gender: {
            type: String, 
            enum: ['Male', 'Female', 'Others']
            // required: true
        },
        address: {
            type:String
            // required: true
        },
        profilePictureUrl: {
            type:String
        },
        role: {
            type: String,
            default: 'employee'
        },
        resetToken: {
            type: String,    
        },
        expiryresetToken: {
            type: Date,     
        },
        loginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date
        }
    }, { timestamps: true });
    

const Employee = new mongoose.model('Employee',LoginSchema)

module.exports = Employee;