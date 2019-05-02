const express = require("express");
const supportersRouter = express.Router();
const { supportersServices } = require("../services/supporters");

supportersRouter.post("/:id/add", (req, res) => {
  const { id } = req.params;
  const { supporterId } = req.body;
  console.log("In add supporter: ", id, supporterId);

  supportersServices
    .addSupporter(id, supporterId)

    .then(() => {
      res.status(200);
      res.json({
        success: `supporter has been added`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

//get all the supporters of the current user
supportersRouter.get("/:id/list", (req, res) => {
  const { id } = req.params;

  supportersServices
    .getSupporters(id)
    .then(data => {
      console.log(data);
      res.status(200);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err.toString());
    });
});

supportersRouter.get("/:id/supporting", (req, res) => {
  const { id } = req.params;
  console.log("in get supporting", id);

  supportersServices
    .getSupportingUsers(id)
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

// remove a specific supporter of the current user
supportersRouter.delete("/:id/remove", (req, res) => {
  const { id } = req.params;
  const { supporterId } = req.body;

  supportersServices
    .removeSupporter(id, supporterId)
    .then(
      () => {
        res.status(200);
        res.json({
          success: "supporter has been removed"
        });
      },
      err => {
        console.log(err);
        res.status(400);
        res.json(err.toString);
      }
    )
    .catch(err => {
      res.status(400);
      res.json(err.toString());
    });
});

module.exports = { supportersRouter };
