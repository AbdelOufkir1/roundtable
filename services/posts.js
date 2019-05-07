const db = require("../services/db")();
const postsServices = {};

postsServices.createPost = (did, uid, text) => {
  return db.one(
    `INSERT INTO posts (debate_id , user_id, text) VALUES ($[did], $[uid], $[text]) RETURNING created_at`,
    { did, uid, text }
  );
};

postsServices.getPost = (d_id, id) => {
  return db.one(
    `SELECT * FROM posts WHERE posts.id = $[id] AND posts.debate_id=$[d_id]`,
    { id, d_id }
  );
};

postsServices.getAllPosts = (did, uid) => {
  return db.many(
    `SELECT * FROM posts WHERE posts.debate_id = $[did] AND posts.user_id = $[uid]`,
    { did, uid }
  );
};

postsServices.getAllDebatePosts = did => {
  return db.many(`SELECT * FROM posts WHERE posts.debate_id = $[did]`, { did });
};

postsServices.updatePost = (d_id, id, u_id, title, body) => {
  return db.none(
    `UPDATE posts SET title = $[title], body = $[body] WHERE debate_id = $[d_id] AND user_id=$[u_id] AND id =$[id]`,
    { title, body, d_id, u_id, id }
  );
};

module.exports = { postsServices };
