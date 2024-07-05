const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send({ message: error.details[0].message });
  next();
};

module.exports = validateId;
