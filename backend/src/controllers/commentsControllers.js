const models = require("../models");

const edit = (req, res) => {
  const comment = req.body;
  comment.id = parseInt(req.params.id, 10);

  models.comment
    .updateComment(comment)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const comment = req.body;

  models.comment
    .insertComment(comment)
    .then(([result]) => {
      res
        .location(`/api/videos/infos/${result.Videos_id}/comments`)
        .send(result)
        .status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.comment
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  edit,
  add,
  destroy,
};
