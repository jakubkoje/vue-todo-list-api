const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
		min: 4,
		max: 20
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = mongoose.model("Message", todoSchema);
