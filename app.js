const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./src/routes/accountRoutes');
const jwt = require('jsonwebtoken');
const router = express.Router();
const accountModel = require('./src/models/accountModel');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/accounts', accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password (perform user authentication)
    const user = await accountModel.getAccountByEmail(email);

   // Check if user exists and password is correct
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
     return res.status(401).json({ error: 'Invalid email or password' });
   }
    // Generate a bearer token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;