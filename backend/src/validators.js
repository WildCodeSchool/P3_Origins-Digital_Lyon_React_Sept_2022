const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
    .max(75)
    .required(),
  firstname: Joi.string().max(75).required(),
  lastname: Joi.string().max(75).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({
      validationErrors: [
        {
          message: "firstname is required",
          type: "any.required",
          context: {
            label: "firstname",
            key: "firstname",
          },
        },
        {
          message: "email must be a valid email",
          type: "string.email",
          context: {
            value: "invalid-email-address",
            label: "email",
            key: "email",
          },
        },
      ],
    });
  } else {
    next();
  }
};
module.exports = {
  validateUser,
};
