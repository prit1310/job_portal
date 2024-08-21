const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { signUpSchema, loginSchema } = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const { contactSchema } = require('../validators/contact-validator');
const contactController = require('../controllers/contact-controller');

router.route('/').get(authcontrollers.home);
router.route('/register').post(validate(signUpSchema), authcontrollers.register);
router.route('/login').post(validate(loginSchema), authcontrollers.login);
router.route('/user').get(authMiddleware, authcontrollers.user);
router.route('/forgot-password').post(authcontrollers.forgotPassword);
router.route('/reset-password').post(authcontrollers.resetPassword);
// Route to submit the contact form
router.route('/contact').post(validate(contactSchema), contactController.addContact);

module.exports = router;