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
    return db.many(`select
    debate.*,
    u1.name AS user1_name,
    u1.image AS user1_image,
    u2.name AS user2_name,
    u2.image AS user2_image
    FROM debate 
    JOIN users u1
      ON 
    debate.first_debater = u1.id 
     JOIN 
    users u2 
      ON
    debate.second_debater = u2.id;
    `)
}       


debateServices.updateDebate = (d_id, title, description, category, rules) => {
    return db.none(`UPDATE debate SET title = $[title], description = $[description], category= $[category], rules = $[rules] WHERE debate.id = $[d_id]`, {title, description, category, rules, d_id})
}

debateServices.deleteDebate = (d_id) =>{
    return db.none(`DELETE * FROM debate WHERE debate.id = $[d_id]`, {d_id})
}



module.exports = { debateServices }