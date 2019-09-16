const express = require('express');
const server = express();
const PORT = process.env.PORT || 4500;
const bcrypt = require('bcrypt');
const Users = require('./models/users');

server.use(express.json());

// sanity route
server.get('/', (req, res) => {
    res.send("It's alive!");
});

// get users route
server.get('/api/users', async (req, res) => {
    const users = await Users.getUsers();
    res.status(200).json(users)
});

// register route
server.post('/api/register', (req, res) => {
    let {USERNAME, PASSWORD} = req.body;
    bcrypt.hash(PASSWORD, 8, async (err, hash) => {
        const savedUser = await Users.add({USERNAME, PASSWORD: hash});
        res.status(201).json(savedUser);
    });
});

// log in route
server.post('/api/login', (req, res) => {
    
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});