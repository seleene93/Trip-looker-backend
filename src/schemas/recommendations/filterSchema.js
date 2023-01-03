const Joi = require("joi");

const filterSchema = Joi.object({
  categoria: Joi.string()
    .valid("ocio", "cultural", "romantico", "expedicion", "otro")
    .messages({
      "any.only":
        "Categoría sólo puede ser ocio, cultural, romántico, expedición y otro",
    }),
  lugar: Joi.string().max(20).messages({
    "string.max": "Lugar sólo puede contener 20 caracteres de máximo",
    "string.base": "Lugar es un string",
  }),
});

module.exports = filterSchema;
