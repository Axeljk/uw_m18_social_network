const { Thought, User } = require("../models");

const thoughtController = {
	getThoughts(req, res) {
		Thought.find()
			.sort({ createdAt: -1 })
			.populate("reactions")
			.then(thoughts => res.json(thoughts))
			.catch(err => res.status(500).json(err));
	},
	createThought(req, res) {
		Thought.create(req.body)
			.then(thought => {
				return User.findOneAndUpdate({ _id: req.body.id }, { $push: { thoughts: thought._id }})
			})
			.then(user => {
				if (user)
					return res.json(user)
				else
					return res.status(404).json({ message: "No user with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	getThought(req, res) {
		Thought.findOne({ _id: req.params.id })
			.populate("reactions")
			.then((thought) => {
				if (thought)
					return res.json(thought);
				else
					return res.status(404).json({ message: "No thought with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
			.then(thought => {
				if (thought)
					return res.json(thought);
				else
					return res.status(404).json({ message: "No thought with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	deleteThought(req, res) {
		Thought.findOneAndRemove({ _id: req.params.id })
			.then(thought => {
				if (thought)
					return res.json({ message: "Thought successfully forgotten." });
				else
					return res.status(404).json({ message: "No thought with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	addReaction(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { reactions: req.body }})
			.then(thought => {
				if (thought)
					return res.json(thought);
				else
					return res.status(404).json({ message: "No thought with that ID." });
			})
			.catch(err => res.status(500).json(err));
	},
	removeReaction(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.id }, { $pull: { reactions: { reactionId : req.params.reactionId }}})
		.then(thought => {
			if (thought)
				return res.json(thought);
			else
				return res.status(404).json({ message: "No reaction with that ID." });
		})
		.catch(err => res.status(500).json(err));
	}
}

module.exports = thoughtController;