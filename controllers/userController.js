const { User, Thought } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find()
			.populate("friends")
			.populate("thoughts")
			.then(users => res.json(users))
			.catch(err => res.status(500).json(err));
	},
	createUser(req, res) {
		User.create(req.body)
			.then(user => res.json(user))
			.catch(err => res.status(500).json(err));
	},
	getUser(req, res) {
		User.findOne({ _id: req.params.id })
			.populate("friends")
			.populate("thoughts")
			.then((user) => {
				if (user)
					return res.json(user);
				else
					return res.status(404).json({ message: "No user with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
			.then(user => {
				if (user)
					return res.json(user);
				else
					return res.status(404).json({ message: "No user with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.id })
			.then(user => {
				if (user)
					return res.json({ message: "User successfully deleted." });
				else
					return res.status(404).json({ message: "No user with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	addFriend(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId }})
			.then(user => {
				if (user)
					return res.json(user);
				else
					return res.status(404).json({ message: "No user with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	removeFriend(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId }})
		.then(user => {
			if (user)
				return res.json({ message: "Successfully ended Friendship." });
			else
				return res.status(404).json({ message: "No user with that ID." });
		})
		.catch(err => res.status(500).json(err));
	}
}

module.exports = userController;