const Joi = require("@hapi/joi");

const addValidation = data => {
	const schema = {
		title: Joi.string()
			.min(4)
			.max(20)
			.required()
	};
	return Joi.validate(data, schema);
};

module.exports.addValidation = addValidation;
