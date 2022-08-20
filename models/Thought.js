const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280
	},
	createAt: {
		type: Date,
		default: Date.now,
		get: (date) => date.toLocaleString()
	},
	username: {
		type: String,
		required: true
	},
	reactions: [Reaction]
},
{
	toJSON: { getters: true }
});

thoughtSchema.virtual("reactionCount").get(() => this.reactions.length);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;