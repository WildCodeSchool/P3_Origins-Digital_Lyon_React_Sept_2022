// Ajout de uuid
const { v4: uuidv4 } = require("uuid");
const models = require("../models");
// Verify if the email exist on the database (link with a user), if it is not the case, we send nothing because it would be a security fail
const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// I generate my token through uuidv4
// I save the token in my BDD and associate it with the user
// I transmit the token to the next middleware
const generatePasswordToken = (req, res, next) => {
  const { user } = req;
  user.passwordToken = uuidv4();
  models.user
    .updatePasswordToken(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// Verify if the tokenPassword exist
const verifyTokenPassword = (req, res, next) => {
  const { passwordToken } = req.body;
  models.user
    .selectToken(passwordToken)
    .then(([users]) => {
      console.warn(users);
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(501);
    });
};
// Create and hash a new password
const resetPassword = (req, res) => {
  const { user } = req;
  user.hashedPassword = req.body.hashedPassword;
  models.user
    .updatePasswordAfterReset(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  verifyEmail,
  generatePasswordToken,
  verifyTokenPassword,
  resetPassword,
};
