const db = require('../services/db')();
const postsServices = {};

postsServices.createPost = (d_id, u_id, title, body) => {
    return db.none(`INSERT INTO posts (debate_id , user_id, title, body) VALUES ($[d_id], $[u_id], $[title], $[body])`, {d_id, u_id, title, body})
}

postsServices.getPost = (d_id, id) => {
    return db.one(`SELECT * FROM posts WHERE posts.id = $[id] AND posts.debate_id=$[d_id]`, { id, d_id})
}

postsServices.getAllPosts = (d_id) =>{
    return db.many(`SELECT * FROM posts WHERE posts.debate_id = $[d_id]`, { d_id })
}

postsServices.updatePost = (d_id, id, u_id, title, body) =>{
    return db.none(`UPDATE posts SET title = $[title], body = $[body] WHERE debate_id = $[d_id] AND user_id=$[u_id] AND id =$[id]`, { title, body, d_id, u_id, id })
}

module.exports = {postsServices}