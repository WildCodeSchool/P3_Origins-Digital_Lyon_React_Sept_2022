require("dotenv").config();
const nodemailer = require("nodemailer");

const { SMTP_USER } = process.env;
const { SMTP_PASSWORD } = process.env;
const { SMTP_HOST } = process.env;
const { SMTP_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: `${SMTP_HOST}`,
  port: `${SMTP_PORT}`,
  secure: true,
  auth: {
    user: `${SMTP_USER}`,
    pass: `${SMTP_PASSWORD}`,
  },
});

const sendForgottenPassword = (req, res) => {
  transporter.sendMail(
    {
      from: "lulu69360@gmail.com",
      to: req.user.email,
      subject: "Mot de passe oublié",
      text: "Pour créer un nouveau mot de passe, cliquez ici !",
      html: `<p>Pour créer un nouveau mot de passe, <a href="http://localhost:3000/api/resetpassword/${req.user.passwordToken}">cliquez ici !</a></p>,`,
    },
    (err, info) => {
      console.warn(info);
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.sendStatus(200);
    }
  );
};

const sendForgottenEmail = (req, res) => {
  transporter.sendMail(
    {
      from: SMTP_USER,
      to: req.user.email,
      subject: "Email oublié",
      text: "Si vous recevez ce mail, c'est qu'il s'agit de la bonne adresse mail !",
      html: `<p>L'adresse mail utilisée pour vous connecter à votre compte La Ligne Bleue est celle-ci : ${req.user.email}</a></p>`,
    },
    (err, info) => {
      console.warn(info);
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.sendStatus(200);
    }
  );
};

module.exports = { sendForgottenPassword, sendForgottenEmail };
