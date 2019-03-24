const db = require('../services/db')();
const debatersServices = {};

debatersServices.addDebater = (id, debaterId) => {
    return db.none(`INSERT INTO debaters (user_id, id) VALUES ($[id], $[debaterId])`, {id, debaterId})
}

debatersServices.getDebaters = (id) => {
    return db.many(`SELECT d.id, * FROM debaters d JOIN users u ON d.id = u.id WHERE d.user_id = $[id]`, { id });
}

// debatersServices.removeDebater = (id, debaterId) => {
    // return db.none(`DELETE FROM debaters WHERE user_id=$[id] AND id=$[debaterId]`, {id, debaterId})
// }


module.exports ={debatersServices}
