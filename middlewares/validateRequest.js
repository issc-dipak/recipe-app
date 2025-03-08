const Joi = require("joi");

// ✅ Feedback Schema Validation
const feedbackSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  recipe_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

module.exports = async (req, res, next) => {
  try {
    await feedbackSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};
