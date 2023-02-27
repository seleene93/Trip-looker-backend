const Joi = require("joi");

const postVoteSchema = Joi.string().valid("positivo", "negativo");

module.exports = postVoteSchema;
