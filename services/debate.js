const db = require('../services/db')();
const debateServices = {};

debateServices.createDebate = (first_debater, second_debater, title, description, category, rules) =>{
    return db.none( `INSERT INTO debate (first_debater, second_debater, title, description, category, rules, status) VALUES ($[first_debater], $[second_debater], $[title], $[description], $[category], $[rules], true)`, {first_debater, second_debater, title, description,category, rules, status:true})
}

debateServices.getDebate = (d_id) => {
    return db.one(`SELECT * FROM debate WHERE debate.id = $[d_id]`,{d_id})
    // return db.one(`select * from debate join users ON debate.first_debater = users.id AND debate.second_debater = users.id WHERE debate.id =${d_id}`)
}

debateServices.getAllDebates = () => {
    return db.many(`SELECT * FROM debate`)
}       


debateServices.updateDebate = (d_id, title, description, category, rules) => {
    return db.none(`UPDATE debate SET title = $[title], description = $[description], category= $[category], rules = $[rules] WHERE debate.id = $[d_id]`, {title, description, category, rules, d_id})
}

debateServices.deleteDebate = (d_id) =>{
    return db.none(`DELETE * FROM debate WHERE debate.id = $[d_id]`, {d_id})
}



module.exports = { debateServices }