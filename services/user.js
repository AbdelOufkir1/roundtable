const db = require('../services/db')();
const userServices = {};

userServices.createUser = (name, password, email) => {
    return db.none(`INSERT INTO users (name, password, email) VALUES ( '${name}', '${password}', '${email}' )`)
}

userServices.getAllUsers = () => {
    return db.many(`SELECT * FROM users`)
}

userServices.getUser = (id) => {
    return db.one(`SELECT * FROM users WHERE users.id = ${id}`)
}

userServices.updateUser = (id, username, email, password, bio) => {
    return db.none(`UPDATE users SET name = '${username}', password = '${password}', bio = '${bio}', email = '${email}' WHERE id = ${id}` )
}

userServices.deleteUser = (name) => {
    return db.none(`DELETE FROM users WHERE name = '${name}'`)
}

module.exports = { userServices };

