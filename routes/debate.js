const express = require("express");
const debateRouter = express.Router();
const { debateServices } = require("../services/debate");

debateRouter.get("/ping", (req, res) => {
  res.json({
    pong: "in debate's Router"
  });
});

debateRouter.post("/", (req, res) => {
  console.log("In debate route");

  const {
    first_debater,
    second_debater,
    title,
    description,
    category,
    rules
  } = req.body;

  debateServices
    .createDebate(
      first_debater,
      second_debater,
      title,
      description,
      category,
      rules
    )
    .then(id => {
      res.status(200);
      res.json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

debateRouter.get("/:did/followers", (req, res) => {
  const { did } = req.params;

  debateServices
    .getFollowers(did)
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log("err in get followers: ", err);
      res.status(400);
      res.json(err);
    });
});

debateRouter.get("/getfollow", (req, res) => {
  debateServices
    .countfollowers()
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      res.status(400);
      res.json(err);
    });
});

debateRouter.get("/all", (req, res) => {
  debateServices
    .getAllDebates()
    .then(data => {
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      res.status(400);
      res.json(err);
    });
});

debateRouter.post("/addfollower", (req, res) => {
  const { did, uid } = req.body;

  debateServices
    .addfollower(did, uid)
    .then(() => {
      res.status(200);
      res.json({
        success: "follower has been added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

debateRouter.get("/:d_id", (req, res) => {
  const { d_id } = req.params;

  debateServices
    .getDebate(d_id)
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

debateRouter.put("/:d_id", (req, res) => {
  const { d_id } = req.params;
  const { title, description, category, rules } = req.body;

  debateServices
    .updateDebate(d_id, title, description, category, rules)
    .then(() => {
      res.status(200);
      res.json({
        success: "debate was updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

debateRouter.delete("/:d_id", (req, res) => {
  const { d_id } = req.params;

  debateServices
    .deleteDebate(d_id)
    .then(() => {
      res.status(200);
      res.json({
        success: "debate deleted successfully"
      });
    })
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

module.exports = { debateRouter };
