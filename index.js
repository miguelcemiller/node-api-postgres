const express = require('express');
const app = express();
const pool = require('./db');

// access req.body from JSON data
app.use(express.json()) 

// ROUTES

// Create a user
app.post('/api/users', async (req, res) => {
    try {
        const { name, address } = req.body;
        const createUser = await pool.query('INSERT INTO users (name, address) VALUES ($1, $2) RETURNING *', [name, address]);
        res.send(createUser.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// Read all users
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.send(allUsers.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Read a user
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.send(user.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;
        const updateUser = await pool.query('UPDATE users SET name = $1, address = $2 WHERE id = $3', [name, address, id]);
        res.send('User was updated');
    } catch (error) {
        console.log(error.message);
    }
});


// Delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.send('User was deleted');
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
})