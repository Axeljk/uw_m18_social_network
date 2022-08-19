const { User, Thought } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.then(users => res.json(users))
			.catch(err => res.status(500).json(err));
	}
}

module.exports = userController;