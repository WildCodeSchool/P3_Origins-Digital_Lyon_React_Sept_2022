const express = require("express");

const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

const { hashPassword, verifyPassword, verifyToken } = require("../auth");

const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const fileControllers = require("./controllers/fileControllers");

// Auth
router.post("/api/register", hashPassword, userControllers.add);

router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

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
  userControllers.updateAvatar
);
router.get("/api/avatars/:fileName", fileControllers.sendAvatar);

// Gestion des videos
router.get("/api/videos", fileControllers.browseVideos);
router.get("/api/videos/:id", fileControllers.readVideos);
router.put("/api/videos/:id", hashPassword, verifyToken);
router.delete("/api/videos/:id", verifyToken);

module.exports = router;
