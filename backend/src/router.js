const express = require("express");

const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

const { hashPassword, verifyPassword, verifyToken } = require("../auth");

const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const fileControllers = require("./controllers/fileControllers");
const categoryControllers = require("./controllers/categoryControllers");

const favoriteControllers = require("./controllers/favoriteControllers");
const commentsControllers = require("./controllers/commentsControllers");

// Auth
router.post("/api/register", hashPassword, userControllers.add);

router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des categories

router.get("/api/category", categoryControllers.browse);
router.get("/api/category/:id", categoryControllers.read);
router.post("/api/category", categoryControllers.add);
router.put("/api/category/:id", categoryControllers.edit);
router.delete("/api/category/:id", categoryControllers.destroy);

// Gestion des users
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, verifyToken, userControllers.add);
router.put("/api/users/:id", verifyToken, userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des avatars
router.post(
  "/api/avatars",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  fileControllers.updateAvatar
);
router.get(
  "/api/avatars/:fileName",
  hashPassword,
  verifyToken,
  fileControllers.sendAvatar
);

router.post(
  "/api/videos",
  verifyToken,
  upload.fields([{ name: "video" }, { name: "img" }]),
  fileControllers.renameVideo,
  fileControllers.renameImgVideo,
  fileControllers.uploadVideo
);
router.get("/api/videos/promote", fileControllers.promote);
router.post(
  "/api/videos/promote/:id",
  verifyToken,
  fileControllers.editPromote
);

router.get("/api/videos", fileControllers.browse);
router.get("/api/videos/infos/:id", fileControllers.read);
router.get(
  "/api/videos/:fileName",
  fileControllers.sendVideo,
  fileControllers.sendImgVideo
);
router.delete("/api/videos/:id", fileControllers.destroy);

// Gestion des commentaires
router.put("/api/videos/infos/:id/comments/:id", commentsControllers.edit);
router.post(
  "/api/videos/infos/:id/comments",
  verifyToken,
  commentsControllers.add
);

router.post(
  "/api/favoris",

  verifyToken,
  favoriteControllers.addFavorite
);
router.get("/api/favoris/:userId", favoriteControllers.getFav);
router.delete(
  "/api/favoris/:userId/:videoId",
  favoriteControllers.deleteFavorite
);

module.exports = router;
