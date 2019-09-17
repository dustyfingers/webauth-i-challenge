const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

async function add(user) {
    try {
        return await db('users').insert(user)
    } catch (err) {
        console.log(err.message);
    }
}

async function getUsers() {
    try {
        return await db('users');
    } catch (err) {
        console.log(err.message)
    }
}

async function findBy(filter) {
    return await db('users').where(filter);
  }

module.exports = {
    add,
    getUsers,
    findBy
};