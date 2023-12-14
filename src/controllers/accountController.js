const accountModel = require('../models/accountModel');
const authService = require('../services/authService');
const emailService = require('../services/emailService');

const createAccount = async (req, res) => {
    try {
      const { first_name, last_name, email, phone, password, birthday } = req.body;
  
      // Validate input fields
      authService.validateCreateAccountInput({ first_name, last_name, email, phone, password, birthday });
  
      // Check if the email already exists
    const existingUser = await accountModel.getAccountByEmail(email);
    if (existingUser) {
        res.status(400).json({ error: 'Email address is already in use' });
        return;
        }
        
      // Hash the password
      const hashedPassword = await authService.hashPassword(password);
  
      // Create the account
      const accountId = await accountModel.createAccount({
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        birthday,
      });
  
      // Send optional email notification
      emailService.sendEmailNotification(email, 'Account Created', "Your account has been successfully created.<br/><p><b>email:</b> " + email + "</p><p><b>password:</b> " + password +"</p>");
  
      res.status(201).json({ id: accountId });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
  };

const getAllAccounts = async (req, res) => {
    try {
      const accounts = await accountModel.getAllAccounts();
      // Exclude password from each account
      const accountsDataWithoutPassword = accounts.map(({ password, ...accountData }) => accountData);
      res.status(200).json(accountsDataWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
const getAccountById = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await accountModel.getAccountById(id);
    if (!account) {

      res.status(404).json({ error: 'Account not found' });
    } else {
      const { password, ...accountData } = account;
      res.status(200).json(accountData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, phone, birthday } = req.body;

    // Construct the updated account object
    const updatedAccount = {
      first_name,
      last_name,
      phone,
      birthday,
    };

    const updatedData = await accountModel.updateAccount(id, updatedAccount);
    if (updatedData) {
      const { password, ...dataWithoutPassword } = updatedData;
      return res.status(200).json({ message: 'Account updated successfully.', data: [dataWithoutPassword] });
    } else {
      return res.status(500).json({ message: 'Failed to fetch updated account data.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the account exists before attempting to delete
    const account = await accountModel.getAccountById(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Delete the account
    const result = await accountModel.deleteAccount(id);
    console.log(result);

    if (result) {
      return res.status(204).json({ error: 'account deleted successfully.' }); // successful deletion
    } else {
      return res.status(404).json({ error: 'No account found for the given ID.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
    // ... other functions
  };