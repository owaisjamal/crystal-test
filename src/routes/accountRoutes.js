const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// console.log(accountController);
// Example route definitions
router.post(
    '/create',
    [
      body('first_name').notEmpty().withMessage('First name is required').isLength({ max: 100 }).withMessage('First name cannot exceed 100 characters'),
      body('last_name').notEmpty().withMessage('Last name is required').isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),
      body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address').isLength({ max: 100 }).withMessage('Email cannot exceed 100 characters'),
      body('phone').notEmpty().withMessage('Phone is required').isLength({ max: 16 }).withMessage('Phone cannot exceed 16 characters'),
      body('password').notEmpty().withMessage('Password is required').isLength({ max: 50 }).withMessage('Password cannot exceed 50 characters'),
      body('birthday').optional({ nullable: true, checkFalsy: true }).isDate().withMessage('Invalid birthday format'),
      // Add validation rules for other fields
    ],
    accountController.createAccount
  );
router.get('/', authMiddleware.authenticateToken, accountController.getAllAccounts);  // This should be a GET request
router.get('/:id',authMiddleware.authenticateToken, accountController.getAccountById);
router.put('/:id',authMiddleware.authenticateToken, accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
