const express = require('express');
const server = express();
const PORT = process.env.PORT || 4500;
const bcrypt = require('bcrypt');
const Users = require('./models/users');
const db = require('./data/dbConfig');

server.use(express.json());

// sanity route
server.get('/', (req, res) => {
    res.send("It's alive!");
});

// get users route
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.getUsers();
        users ?
            res.status(200).json(users) :
            res.status(500).json({ message: 'There was an error getting users. Try logging out and logging in again!' })
    } catch (err) {
        console.log(err.message);
    }
});

// register route
server.post('/api/register', (req, res) => {
    try {
        let { USERNAME, PASSWORD } = req.body;
        bcrypt.hash(PASSWORD, 8, async (err, hash) => {
            const savedUser = await Users.add({ USERNAME, PASSWORD: hash });
            savedUser ?
                res.status(201).json(savedUser) :
                res.status(500).json({ message: 'There was an error while signing up a user with those credentials.' });
        });
    } catch (err) {
        console.log(err.message);
    }
});

// log in route
server.post('/api/login', async (req, res) => {
    try {
        let { USERNAME, PASSWORD } = req.body;
        let user = await Users.findBy({ USERNAME }).first();
        console.log(PASSWORD);
        console.log(user);
        console.log(user);
        await bcrypt.compare(PASSWORD, user.PASSWORD, (err, response) => {
            response ?
                res.status(200).json({ message: `${user.USERNAME} is now logged in!` }) :
                res.status(500).json({ message: err.message })
        })
    } catch (err) {
        console.log(err.message);
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});