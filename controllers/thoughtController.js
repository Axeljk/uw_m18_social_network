const { Thought } = require("../models");

const thoughtController = {
	getThoughts(req, res) {
		Thought.find()
			.sort({ createdAt: -1 })
//			.populate("reactions")
			.then(thoughts => res.json(thoughts))
			.catch(err => res.status(500).json(err));
	},
	createThought(req, res) {
		Thought.create(req.body)
			.then(thought => res.json(thought))
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
}

module.exports = thoughtController;