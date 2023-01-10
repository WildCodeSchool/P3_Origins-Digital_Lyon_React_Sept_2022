const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const avatarDirectory = process.env.AVATAR_DIRECTORY || "public/";

const renameAvatar = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${avatarDirectory}${filename}`,
    `${avatarDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.avatar = `${uuid}-${originalname}`;
      next();
    }
  );
};

const sendAvatar = (req, res) => {
  const { fileName } = req.params;

  res.download(avatarDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Avatar not found.`,
      });
    }
  });
};

const browseVideos = (req, res) => {
  models.videos
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const readVideos = (req, res) => {
  const { id } = req.params;

  models.videos
    .find(id)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = { renameAvatar, sendAvatar, browseVideos, readVideos };
