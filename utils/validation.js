const Joi = require('joi');

exports.createbookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publishedYear: Joi.number().required(),
});

exports.updatebookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  genre: Joi.string().optional(),
  publishedYear: Joi.number().optional(),
});

exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  socketId: Joi.string().optional(),
  subscribeGenre: Joi.string().required(),
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  socketId: Joi.string().optional(),
  subscribeGenre: Joi.string().optional(),
});

exports.validation = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      console.log(error);
      res.status(400).json({ error: err.message });
      return;
    }
    next();
  };
};