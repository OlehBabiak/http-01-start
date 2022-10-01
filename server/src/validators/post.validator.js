const Joi = require('joi');

module.exports = {
  createPost: Joi.object().keys({
    title: Joi.string().min(3).max(15).required(),
    content: Joi.string().min(6).max(20).required()
  })
}
