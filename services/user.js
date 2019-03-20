const db = require('../services/db')();
const userServices = {};

userServices.createUser = (name, password, email) => {
    return db.none(`INSERT INTO users (name, password, email) VALUES ( '${name}', '${password}', '${email}' )`)
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

userServices.addSupporter = (id, supporterId) => {
    return db.none(`INSERT INTO supporters (user_id, id) VALUES (${id}, ${supporterId}) `)
}

userServices.getSupporters = (id) => {
    return db.many(`SELECT s.id, * FROM supporters s JOIN users u ON s.id = u.id WHERE s.user_id = ${id};
    `)
}

userServices.removeSupporter = (id, supporterId) => {
    return db.none(`DELETE FROM supporters WHERE user_id =${id} AND id=${supporterId}`)
}

userServices.addDebater = (id, debaterId) => {
    return db.none(`INSERT INTO debaters (user_id, id) VALUES (${id}, ${debaterId}) `)
}

userServices.getDebaters = (id) => {
    return db.many(`SELECT d.id, * FROM debaters d JOIN users u ON d.id = u.id WHERE d.user_id = ${id}`);
}

userServices.removeDebater = (id, debaterId) => {
    return db.none(`DELETE FROM debaters WHERE user_id=${id} AND id=${debaterId}`)
}



module.exports = { userServices };

