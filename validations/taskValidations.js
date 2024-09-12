const Joi = require("joi");

// Function to return the Joi schema for creating a task
exports.createTask = () => {
  return Joi.object({
    title: Joi.string().required().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "any.required": `"title" is a required field`,
    }),
    description: Joi.string().required().messages({
      "string.base": `"description" should be a type of 'text'`,
      "string.empty": `"description" cannot be an empty field`,
      "any.required": `"description" is a required field`,
    }),
    dueDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/) // Ensure format YYYY-MM-DD
      .messages({
        'string.base': `"dueDate" should be a type of 'text'`,
        'string.empty': `"dueDate" cannot be an empty field`,
        'string.pattern.base': `"dueDate" must be in the format YYYY-MM-DD`
      }).required(),
  }).required();
};

exports.updateTask = () => {
  return Joi.object({
    title: Joi.string().allow("").required().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "any.required": `"title" is a required field`,
    }),
    description: Joi.string().allow("").required().messages({
      "string.base": `"description" should be a type of 'text'`,
      "string.empty": `"description" cannot be an empty field`,
      "any.required": `"description" is a required field`,
    }),
    dueDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).allow('').required().messages({
        'string.base': `"dueDate" should be a type of 'text'`,
        'string.empty': `"dueDate" cannot be an empty field`,
        'string.pattern.base': `"dueDate" must be in the format YYYY-MM-DD`,
        'any.required': `"dueDate" is a required field`
      }),
    status: Joi.string()
      .valid("Pending", "In Progress", "Done")
      .allow("")
      .required()
      .messages({
        "string.base": `"status" should be a type of 'text'`,
        "string.empty": `"status" cannot be an empty field`,
        "any.required": `"status" is a required field`,
        "any.only": `"status" must be one of [Pending, In Progress, Done]`,
      }),
  }).required();
};

// Define the schema for path parameters
exports.id = Joi.object({
    id: Joi.number().integer().positive().required()
  });
