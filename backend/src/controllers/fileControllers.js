const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const avatarDirectory = process.env.AVATAR_DIRECTORY || "public/";
const videoDirectory = process.env.AVATAR_DIRECTORY || "public/";
const imgVideoDirectory = process.env.AVATAR_DIRECTORY || "public/";

// Gestion Avatars

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

// Gestions des Vidéos

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

const read = (req, res) => {
  const { id } = req.params;

  models.videos
    .find(id)
    .then(([results]) => {
      if (!results[0]) {
        res.sendStatus(404);
        return;
      }
      const videos = results[0];
      models.comment
        .getComments(req.params.id)
        .then(([videosComments]) => {
          videos.comment = videosComments;
          res.send(videos);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    // récupération du nom de fichier de la vidéo et de l'img à supprimer
    const [results] = await models.videos.find(id);
    const videoName = results[0].name;
    const imgVideoName = results[0].img;

    // suppression de la vidéo dans la base de données
    const [result] = await models.videos.delete(id);
    if (result.affectedRows === 0) res.sendStatus(404);
    else {
      // suppression du fichier vidéo
      fs.unlink(`${videoDirectory}${videoName}`, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          // suppression du fichier image
          fs.unlink(`${imgVideoDirectory}${imgVideoName}`, (err1) => {
            if (err1) {
              console.error(err1);
              res.sendStatus(500);
            } else {
              res.sendStatus(204);
            }
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
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
  const { originalname } = req.files.img[0];

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

const promote = (req, res) => {
  models.videos
    .promotedVideo()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const editPromote = (req, res) => {
  const videos = req.body;
  videos.id = parseInt(req.params.id, 10);

  models.videos
    .updatePromote(videos)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
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

module.exports = {
  renameAvatar,
  sendAvatar,
  renameVideo,
  sendVideo,
  updateAvatar,
  uploadVideo,
  browse,
  read,
  renameImgVideo,
  sendImgVideo,
  destroy,
  promote,
  editPromote,
};
