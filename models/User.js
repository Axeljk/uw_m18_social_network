const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		require: true,
		unique: true,
		validate: [
			(email) => /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email),
			"Please fill a valid email address."
		],
		match: [
			/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
			"Please fill a valid email address."
		]
	},
	thoughts: [{
		type: Schema.Types.ObjectId,
		ref: "Thought"
	}],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]
});

thoughtSchema.virtual("friendCount").get(() => this.friends.length);

const User = model("user", userSchema);

module.exports = User;