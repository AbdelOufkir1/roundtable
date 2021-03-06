const db = require("../services/db")();
const discussionsServices = {};

discussionsServices.createDiscussion = (d_id, u_id, title, body) => {
  return db.none(
    `INSERT INTO discussions (debate_id, user_id, title, body) VALUES ($[d_id], $[u_id], $[title], $[body])`,
    { d_id, u_id, title, body }
  );
};

discussionsServices.getAllDiscussion = d_id => {
  return db.many(`SELECT * FROM disucussions WHERE discussions.id = $[d_id]`, {
    d_id
  });
};

discussionsServices.getEveryDiscussion = () => {
  return db.any(`SELECT 
    discussions.*, 
    u.name AS user_name, 
    u.image AS user_image, 
    d.title 
    FROM discussions 
    JOIN users u 
    ON 
    discussions.user_id = u.id 
    JOIN debate d 
    ON 
    discussions.debate_id = d.id`);
};

module.exports = { discussionsServices };
