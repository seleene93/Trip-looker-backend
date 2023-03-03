const Joi = require("joi");

// Obtenemos el año en el que estamos - 18 años para poner límite de edad al registro
let date = new Date(Date.now());
date.setFullYear(date.getFullYear() - 18);

const createUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(20).required().messages({
    "string.min": "El nombre debe tener como mínimo 2 caracteres",
    "string.max": "El nombre no pueden contener más de 20 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  apellidos: Joi.string().min(4).max(100).required().messages({
    "string.min": "Los apellidos deben tener como mínimo 10 caracteres",
    "string.max": "Los apellidos no pueden contener más de 100 caracteres",
    "any.required": "Los apellidos son obligatorios",
  }),
  email: Joi.string().email().min(5).max(100).required().messages({
    "string.min": "El email debe contener como mínimo 5 caracteres",
    "string.max": "El email no puede contener más de 100 caracteres",
    "any.required": "El email es obligatorio",
    "string.email": "Introduce un email válido",
  }),
  ciudad: Joi.string().min(5).max(20).required().messages({
    "string.min": "Ciudad debe contener como mínimo 5 caracteres",
    "string.max": "Ciudad no puede contener más de 20 caracteres",
    "any.required": "Ciudad es obligatorio",
  }),
  password: Joi.string().min(5).max(100).required().messages({
    "string.min": "La contraseña debe contener como mínimo 5 caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
  fecha_nac: Joi.date().less(date).required().messages({
    "date.less": "Debes ser mayor de edad para registrarte",
    "any.required": "La fecha de nacimiento es obligatoria",
  }),
});

module.exports = createUserSchema;
