const Joi = require("joi");

const postIdSchema = Joi.number().positive().required().messages({
  "number.base": "El id tiene que ser un número",
});

module.exports = postIdSchema;
