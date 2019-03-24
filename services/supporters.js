const db = require('../services/db')();
const supportersServices = {};

supportersServices.addSupporter = (id, supporterId) => {
    return db.none(`INSERT INTO supporters (user_id, id) VALUES ($[id], $[supporterId]) `, {id , supporterId})
}

supportersServices.getSupporters = (id) => {
    return db.many(`SELECT s.id, * FROM supporters s JOIN users u ON s.id = u.id WHERE s.user_id = $[id]`,  {id})
}

supportersServices.removeSupporter = (id, supporterId) => {
    return db.none(`DELETE FROM supporters WHERE user_id =$[id] AND id=$[supporterId]`, {id, supporterId})
}

module.exports = { supportersServices };