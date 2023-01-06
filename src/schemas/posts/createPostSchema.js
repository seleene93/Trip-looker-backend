const Joi = require("joi");

const createPostSchema = Joi.object({
  titulo: Joi.string()
    .min(4)
    .max(20)
    .required()
    .regex(/^[a-zA-Z]/)
    .messages({
      "string.min": "El título debe tener como mínimo 4 caracteres ",
      "string.max": "El título no puede contener más de 20 caracteres ",
      "string.empty": "El título es obligatorio",
      "string.pattern.base": "El título debe ser texto",
    }),
  categoria: Joi.string()
    .valid("ocio", "cultural", "romantico", "expedicion", "otro")
    .messages({
      "any.only":
        "Categoría sólo puede ser ocio, cultural, romántico, expedición y otro",
    }),
  lugar: Joi.string()
    .max(20)
    .required()
    .regex(/^[a-zA-Z]/)
    .messages({
      "string.max": "Lugar sólo puede contener 20 caracteres de máximo",
      "string.pattern.base": "Lugar sólo puede ser texto",
      "any.required": "El lugar es obligatorio",
    }),
  entradilla: Joi.string()
    .max(200)
    .regex(/^[a-zA-Z]/)
    .messages({
      "string.max": "Sólo puede contener 200 caracteres de máximo",
      "string.pattern.base": "Sólo puede ser texto",
    }),
  texto: Joi.string()
    .max(5000)
    .regex(/^[a-zA-Z]/)
    .messages({
      "string.max": "Sólo puede contener 200 caracteres de máximo",
      "string.pattern.base": "Sólo puede ser texto",
    }),
});

module.exports = createPostSchema;
