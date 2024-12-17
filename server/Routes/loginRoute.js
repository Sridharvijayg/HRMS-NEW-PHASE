const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthMiddleware = require('../Middleware/authMiddleware')

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cors());

const Auth = require('../Controllers/authController');

router.post('/',Auth.Login);
router.post('/reset_password',AuthMiddleware.resetPasswordLimiter,Auth.ResetPassword);
router.get('/reset_password/:token',Auth.VerifyToken);
router.post('/reset_password/:token',Auth.UpdatePassword);

module.exports = router;