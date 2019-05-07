const express = require("express");
const userRouter = express.Router();
const { userServices } = require("../services/user");

userRouter.get("/ping", (req, res) => {
  res.json({
    msg: "Pong in UserRouter"
  });
});

userRouter.get("/allusers", (req, res) => {
  userServices
    .getAllUsers()
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

userRouter.post("/", (req, res) => {
  const { name, firebase_uid, email, image } = req.body;

  userServices
    .createUser(name, firebase_uid, email, image)
    .then(data => {
      res.status(200);
      res.json(data);
      console.log("data from create user: ", data);
    })
    .catch(err => {
      res.status(400);
      console.log("err in post", err);
      res.json(err.toString());
    });
});

userRouter.get("/", (req, res) => {
  const { fbuid } = req.query;

  userServices
    .getUser(fbuid)
    .then(data => {
      console.log("get user with fbuid: ", data);
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log("error in get req: ", err);
      res.status(400);
      res.json(err);
    });
});

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  userServices
    .getUserwID(id)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, bio, image } = req.body;

  userServices
    .updateUser(id, name, email, bio, image)
    .then(() => {
      res.status(200);
      res.json({
        success: `user's infos with id:${id} have been updated`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

userRouter.delete("/:name", (req, res) => {
  const { name } = req.params;

  userServices
    .deleteUser(name)
    .then(() => {
      res.status(200);
      res.json({
        success: `user named ${name} has been deleted`
      });
    })
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

module.exports = { userRouter };
