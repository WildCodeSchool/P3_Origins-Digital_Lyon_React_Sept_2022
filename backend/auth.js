const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    if (type !== "Bearer") throw new Error("Only Bearer token allowed");
    req.payloads = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: "Identification incomplète" });
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
