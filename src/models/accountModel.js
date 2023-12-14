const db = require('../database/db');

const createAccount = async (account) => {
  const { first_name, last_name, email, phone, password, birthday } = account;
  const [result] = await db.execute(
    'INSERT INTO accounts (first_name, last_name, email, phone, password, birthday, created_at, last_modified) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [first_name, last_name, email, phone, password, birthday]
  );
  return result.insertId;
};

const getAllAccounts = async () => {
  const [rows] = await db.execute('SELECT * FROM accounts');
  return rows;
};

const getAccountById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM accounts WHERE id = ?', [id]);
  return rows[0];
};

const getAccountByEmail = async (email) => {
    try {
      const query = 'SELECT * FROM accounts WHERE email = ?';
      const [rows, fields] = await db.query(query, [email]);
      return rows[0]; // Assuming the email is unique, return the first result
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  
const updateAccount = async (id, { first_name, last_name, phone, birthday }) => {
  try {
    // Initialize an array to store SET clauses
    const setClauses = [];

    // Check and add clauses for each field if it's defined
    if (first_name !== undefined) setClauses.push('first_name = ?');
    if (last_name !== undefined) setClauses.push('last_name = ?');
    if (phone !== undefined) setClauses.push('phone = ?');
    if (birthday !== undefined) setClauses.push('birthday = ?');

    // If there are no fields to update, return early
    if (setClauses.length === 0) return;

    // Build the SET part of the SQL query
    const setClause = setClauses.join(', ');

      // Construct the SQL query
      const sql = `UPDATE accounts SET ${setClause} WHERE id = ?`;

      // Build the values array based on the defined fields
      const values = [first_name, last_name, phone, birthday, id].filter((value) => value !== undefined);
  
      // Execute the SQL query
      const [result] = await db.execute(sql, values);
   
    if (result.affectedRows > 0) {
      // Fetch the updated data and return it along with a success message
      const updatedData = await getAccountById(id);
      return updatedData;
      
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAccount = async (id) => {
  try {
    const deletedData = await db.execute('DELETE FROM accounts WHERE id = ?', [id]);
    return deletedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  getAccountByEmail
};
