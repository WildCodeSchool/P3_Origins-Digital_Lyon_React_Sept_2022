const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const avatarDirectory = process.env.AVATAR_DIRECTORY || "public/";
const videoDirectory = process.env.AVATAR_DIRECTORY || "public/";
const imgVideoDirectory = process.env.AVATAR_DIRECTORY || "public/";

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
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const originalname = req.files.video[0].originalname.replace(/\s/g, "-");

  // On récupère le nom du fichier
  const { filename } = req.files.video[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${videoDirectory}${filename}`,
    `${videoDirectory}${uuid}-${originalname}`,
    (err) => {
      console.error("rename: ", err);
      if (err) throw err;
      req.video = `${uuid}-${originalname}`;
      next();
    }
  );
};
const renameImgVideo = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const { originalname } = req.files.img[0].replace(/\s/g, "-");

  // On récupère le nom du fichier
  const { filename } = req.files.img[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${imgVideoDirectory}${filename}`,
    `${imgVideoDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.img = `${uuid}-${originalname}`;
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
  const imgVideoName = req.img;

  models.videos
    .insert(videos, videoName, imgVideoName)
    .then(([result]) => {
      res.status(201).location(`/api/videos/${result.insertId}`).send();
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
      console.error("error download: ", err);
    }
  });
};

const sendImgVideo = (req, res) => {
  const { fileName } = req.params;

  res.download(imgVideoDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
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
  renameImgVideo,
  sendImgVideo,
};
