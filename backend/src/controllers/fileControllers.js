const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const avatarDirectory = process.env.AVATAR_DIRECTORY || "public/";
const videoDirectory = process.env.AVATAR_DIRECTORY || "public/";

const browse = (req, res) => {
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
const renameVideo = (req, res, next) => {
  console.warn(req.file);
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${videoDirectory}${filename}`,
    `${videoDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.video = `${uuid}-${originalname}`;
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
const uploadVideo = (req, res) => {
  const videoName = req.video;
  const videos = req.body;

  // [videos.name, videos.url, videos.description, videos.img]

  models.videos
    .insert(videos, videoName)
    .then(([result]) => {
      res.location(`/api/videos/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const sendVideo = (req, res) => {
  const { fileName } = req.params;

  res.download(videoDirectory + fileName, fileName, (err) => {
    if (err) {
      res.send({
        message: `Video not found.`,
      });
    }
  });
};
const updateAvatar = (req, res) => {
  const id = req.payloads.sub;
  const { avatar } = req;

  models.user
    .updateAvatar(id, avatar)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ avatar });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  renameAvatar,
  sendAvatar,
  renameVideo,
  sendVideo,
  updateAvatar,
  uploadVideo,
  browse,
};
