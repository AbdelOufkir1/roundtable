const db = require("../services/db")();
const debateServices = {};

debateServices.createDebate = (
  first_debater,
  second_debater,
  title,
  description,
  category,
  rules
) => {
  return db.one(
    `INSERT INTO debate (first_debater, second_debater, title, description, category, rules, status) VALUES ($[first_debater], $[second_debater], $[title], $[description], $[category], $[rules], true) RETURNING id`,
    {
      first_debater,
      second_debater,
      title,
      description,
      category,
      rules,
      status: true
    }
  );
};

debateServices.getDebate = d_id => {
  return db.one(
    `select debate.*,
    c.type as subject,
    u1.id AS debaterone_id,
    u1.name AS debaterOne_name,
    u1.image AS debaterOne_image, 
    u1.numsupporters AS debaterOne_supporters,
    u1.numdebaters AS debaterOne_debaters,
    u1.firebase_uid AS debaterOne_firebaseuid,
    u2.id AS debatertwo_id,
    u2.name AS debaterTwo_name,
    u2.image AS debaterTwo_image,
    u2.numsupporters AS debaterTwo_supporters,
    u2.numdebaters AS debaterTwo_debaters,
    u2.firebase_uid AS debaterTwo_firebaseuid
    FROM debate 
    JOIN category c 
    ON 
    debate.category = c.id
    JOIN users u1
    ON 
    debate.first_debater = u1.id
    JOIN users u2
    ON 
    debate.second_debater = u2.id
    WHERE debate.id = $[d_id] `,
    { d_id }
  );
};

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
    `);
};

debateServices.countfollowers = () => {
  return db.any(
    `SELECT debate_id,
     COUNT (user_id) 
     FROM debatefollower 
     GROUP BY debate_id `
  );

  // "SELECT debate_id, COUNT (*) FROM debatefollower GROUP BY debate_id";
};

debateServices.getFollowers = did => {
  return db.any(
    `SELECT user_id 
    FROM debatefollower 
    WHERE 
    debate_id = $[did]`,
    { did }
  );
};

debateServices.addfollower = (did, uid) => {
  return db.none(
    `insert into debatefollower 
    (debate_id, user_id) 
    values 
    ($[did], $[uid])`,
    { did, uid }
  );
};

debateServices.updateDebate = (d_id, title, description, category, rules) => {
  return db.none(
    `UPDATE debate 
    SET title = $[title], 
    description = $[description], 
    category= $[category], 
    rules = $[rules] 
    WHERE 
    debate.id = $[d_id]`,
    { title, description, category, rules, d_id }
  );
};

debateServices.deleteDebate = d_id => {
  return db.none(
    `DELETE * 
    FROM debate 
    WHERE 
    debate.id = $[d_id]`,
    { d_id }
  );
};

module.exports = { debateServices };
