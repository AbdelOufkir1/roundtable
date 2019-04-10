const db = require('../services/db')();
const userServices = {};

userServices.createUser = (name, firebase_uid, email, image ) => {
    return db.none(`INSERT INTO users (name, firebase_uid, email, image ) VALUES ( $[name], $[firebase_uid], $[email], $[image])`, {name, firebase_uid, email, image})
}

userServices.getAllUsers = () => {
    return db.many(`SELECT * FROM users`)
}

userServices.getUser = (fbuid) => {
    return db.one(`SELECT * FROM users WHERE users.firebase_uid = $[fbuid]`, {fbuid})
}

// userServices.getUser = (id) => {
//     return db.one(`SELECT * FROM users WHERE users.id = $[id]`, {id})
// }

userServices.updateUser = (id, username, email, password, bio) => {
    return db.none(`UPDATE users SET name = '${username}', password = '${password}', bio = '${bio}', email = '${email}' WHERE id = ${id}` )
}

userServices.deleteUser = (name) => {
    return db.none(`DELETE FROM users WHERE name = '${name}'`)
}

module.exports = { userServices };

