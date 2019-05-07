const express = require("express");
const postsRouter = express.Router();
const { postsServices } = require("../services/posts");

postsRouter.get("/ping", (req, res) => {
  res.json({
    pong: "in Posts Router"
  });
});

postsRouter.post("/new", (req, res) => {
  const { did, uid, text } = req.body;

  console.log("in creating new post: ", did, uid, text);

  postsServices
    .createPost(did, uid, text)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

postsRouter.get("/:d_id", (req, res) => {
  const { d_id } = req.params;
  const { id } = req.body;

  // console.log("debate id: ", d_id);
  // console.log("post id: ", id);
  postsServices
    .getPost(d_id, id)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

postsRouter.get("/:did/:uid/all", (req, res) => {
  // console.log("made it to get all posts");
  const { did, uid } = req.params;

  postsServices
    .getAllPosts(did, uid)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log("err in get all posts: ", err);
      res.status(400);
      res.json(err.toString());
    });
});

postsRouter.get("/all", (req, res) => {
  postsServices
    .getPosts()
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

postsRouter.get("/all/:did", (req, res) => {
  // console.log("made it to get all posts");
  const { did } = req.params;

  postsServices
    .getAllDebatePosts(did)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log("err in get all posts: ", err);
      res.status(400);
      res.json(err.toString());
    });
});

postsRouter.put("/:d_id/edit", (req, res) => {
  const { d_id } = req.params;
  const { id, u_id, title, body } = req.body;

  postsServices
    .updatePost(d_id, id, u_id, title, body)
    .then(() => {
      res.status(200);
      res.json({
        success: "post updated successfully"
      });
    })
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

module.exports = { postsRouter };
