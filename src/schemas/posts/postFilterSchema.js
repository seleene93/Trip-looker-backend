const Joi = require("joi");

// Validación de categoría y lugar con Joi

const postFilterSchema = Joi.object({
  categoria: Joi.string()
    // No acepta otra cosa que no sea ocio, cultural, etc...
    .valid("ocio", "cultural", "romantico", "expedicion", "otro")
    .messages({
      "any.only":
        "Categoría sólo puede ser ocio, cultural, romántico, expedición y otro",
    }),
  lugar: Joi.string()
    .max(20)
    .regex(/^[a-zA-Z]/) // Así solo permite que lo que introduzcamos sea texto
    .messages({
      "string.max": "Lugar sólo puede contener 20 caracteres de máximo",
      "string.pattern.base": "Lugar sólo puede ser texto",
    }),
});

module.exports = postFilterSchema;
