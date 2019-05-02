const db = require("../services/db")();
const userServices = {};

userServices.createUser = (name, firebase_uid, email, image) => {
  return db.one(
    `INSERT INTO users (name, firebase_uid, email, image ) VALUES ( $[name], $[firebase_uid], $[email], $[image]) RETURNING id`,
    { name, firebase_uid, email, image }
  );
};

userServices.getAllUsers = () => {
  return db.many(`SELECT * FROM users`);
};

userServices.getUser = fbuid => {
  return db.one(`SELECT * FROM users WHERE users.firebase_uid = $[fbuid]`, {
    fbuid
  });
};

userServices.getUserwID = id => {
  return db.one(`SELECT * FROM users WHERE users.id = $[id]`, { id });
};

userServices.updateUser = (id, username, email, bio, image) => {
  return db.none(
    `UPDATE users SET name = $[username], bio = $[bio], email = $[email], image = $[image] WHERE id = $[id]`,
    { username, bio, email, image, id }
  );
};

userServices.deleteUser = name => {
  return db.none(`DELETE FROM users WHERE name = $[name]`, { name });
};

module.exports = { userServices };
