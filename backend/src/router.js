const express = require("express");

const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

const { hashPassword, verifyPassword, verifyToken } = require("../auth");
const { validateUser } = require("./validators");

const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const fileControllers = require("./controllers/fileControllers");
const categoryControllers = require("./controllers/categoryControllers");

const favoriteControllers = require("./controllers/favoriteControllers");
const commentsControllers = require("./controllers/commentsControllers");

const passwordControllers = require("./controllers/passwordControllers");
const mailControllers = require("./controllers/mailControllers");

// Auth
router.post("/api/register", validateUser, hashPassword, userControllers.add);

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
router.post(
  "/api/users",
  validateUser,
  hashPassword,
  verifyToken,
  userControllers.add
);
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
router.get("/api/avatars/:fileName", fileControllers.sendAvatar);

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
router.delete(
  "/api/videos/infos/:id/comments/:id",
  verifyToken,
  commentsControllers.destroy
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

router.post(
  "/api/forgottenpassword",
  passwordControllers.verifyEmail,
  passwordControllers.generatePasswordToken,
  mailControllers.sendForgottenPassword
);
router.post(
  "/api/resetpassword",
  passwordControllers.verifyTokenPassword,
  hashPassword,
  passwordControllers.resetPassword
);

// Reset email
router.post(
  "/api/forgottenemail",
  passwordControllers.verifyEmail,
  mailControllers.sendForgottenEmail
);

router.post(
  "/api/passwordReset",
  passwordControllers.verifyTokenPassword,
  (req, res) => res.sendStatus(200)
);

module.exports = router;
