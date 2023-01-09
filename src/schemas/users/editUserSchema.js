const Joi = require("joi");

// Obtenemos el año en el que estamos - 18 años para poner límite de edad al registro
let date = new Date(Date.now());
date.setFullYear(date.getFullYear() - 18);

const editUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(20).messages({
    "string.min": "El nombre debe tener como mínimo 2 caracteres",
    "string.max": "El nombre no pueden contener más de 20 caracteres",
  }),
  apellidos: Joi.string().min(10).max(100).messages({
    "string.min": "Los apellidos deben tener como mínimo 10 caracteres",
    "string.max": "Los apellidos no pueden contener más de 100 caracteres",
  }),
  email: Joi.string().email().min(5).max(100).messages({
    "string.min": "El email debe contener como mínimo 5 caracteres",
    "string.max": "El email no puede contener más de 100 caracteres",
    "string.email": "Debe introducir un formato de email válido",
  }),
  tel: Joi.string()
    .length(9)
    .regex(/^[0-9]{9}$/)
    .messages({
      "string.length": "El teléfono debe ser de 9 dígitos",
      "string.pattern.base": "El teléfono no tiene el formato adecuado",
    }),
  password: Joi.string().min(5).max(100).messages({
    "string.min": "La contraseña debe contener como mínimo 5 caracteres",
  }),
  fecha_nac: Joi.date().less(date).messages({
    "date.less": "Debes ser mayor de edad",
  }),
});

module.exports = editUserSchema;
