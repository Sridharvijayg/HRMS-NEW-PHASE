const bcrypt = require('bcrypt');
const Employee = require('../Models/EmployeeModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ login: false, message: "Email and password are required" });
        }

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ login: false, message: "User not found" });
        }

        // Check if the account is locked
        if (employee.lockUntil && employee.lockUntil > Date.now()) {
            const lockDuration = Math.ceil((employee.lockUntil - Date.now()) / (1000 * 60)); // in minutes
            return res.status(403).json({
                login: false,
                message: `Account locked. Try again after ${lockDuration} minutes.`
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, employee.password);
        if (isMatch) {
            // Reset login attempts on successful login
            employee.loginAttempts = 0;
            employee.lockUntil = undefined;
            await employee.save();

            const employeeObject = employee.toObject();
            delete employeeObject.password;
            // Generate JWT token
            const token = jwt.sign(
                { id: employee._id, email: employee.email ,name: employee.name, role:employee.role},
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                login: true,
                message: "Login successful",
                token,
                employee:employeeObject
            });
        } else {
            employee.loginAttempts += 1;
            // Lock the account after 5 failed attempts
            if (employee.loginAttempts >= 5) {
                employee.lockUntil = Date.now() + 5 * 60 * 1000; //  5 min lock
                await employee.save();
                return res.status(403).json({
                    login: false,
                    message: "Too many failed login attempts. Try again after 5 min."
                });
            }
            // Save the updated login attempts
            await employee.save();
            return res.status(401).json({ login: false, message: "Password incorrect" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ login: false, message: "Server error" });
    }
};

  

const ResetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by username
        const employee = await Employee.findOne({ email: email });

        if (!employee) {
            return res.status(401).json({ message: "User not found" });
        }

        // Generate token and set expiry time
        const token = Math.floor(1000 + Math.random() * 9000);
        employee.resetToken = token;
        employee.expiryresetToken = new Date(Date.now() + 120000);  // 2 min 
        await employee.save();

        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        // Set up email options
        const mailOptions = {
            from: 'Hash Enchanted',
            to: email,
            subject: 'OTP for Reset Password',
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f7f7f7; padding: 20px;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p style="font-size: 16px; color: #555;">
                        A request has been made to reset the password for your account associated with <strong>${email}</strong>.
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Please use the following OTP to reset your password:
                    </p>
                    <div style="font-size: 32px; color: #4CAF50; letter-spacing: 4px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; display: inline-block; margin: 20px 0;">
                        ${token}
                    </div>
                    <p style="font-size: 16px; color: #555;">
                        This OTP is valid for the next 2 minutes. If you did not request this, please ignore this email.
                    </p>
                    <p style="font-size: 14px; color: #999; margin-top: 20px;">
                        Thank you, <br> Hash Enchanted
                    </p>
                </div>
            </div>
        `
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(400).json({ message: 'Error sending OTP' });
            }
            res.status(200).json({ message: 'OTP sent successfully' });
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const VerifyToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Find employee with matching token and check if token has not expired
        const employee = await Employee.findOne({
            resetToken: token,
            expiryresetToken: { $gt: Date.now() }
        });

        // If no employee is found or token is expired
        if (!employee) {
            return res.status(401).json({ status: false, message: 'Invalid or expired OTP' });
        }

        // If the token is valid
        return res.status(200).json({ status: true, message: 'OTP verified successfully' });

    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

const UpdatePassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Validate input
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters ' });
        }

        // Find employee with matching token and valid expiry
        const employee = await Employee.findOne({
            resetToken: token,
            expiryresetToken: { $gt: Date.now() }  // Check token expiry
        });

        if (!employee) {
            return res.status(401).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        employee.password = hashedPassword;

        // Clear reset token and expiry
        employee.resetToken = null;
        employee.expiryresetToken = null;

        // Save the updated employee data
        await employee.save();

        res.status(200).json({ message: 'Password reset successful' });

    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {Login,ResetPassword,VerifyToken,UpdatePassword}