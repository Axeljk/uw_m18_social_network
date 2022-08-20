const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

mongoose.connect("mongodb://localhost:27017/socialDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Seed connection made."));

const thoughtSeed = [
	{
		thoughtText: "I am going to think.",
		username: "Axeljk"
	},
	{
		thoughtText: "I am thinking.",
		username: "Axeljk"
	},
	{
		thoughtText: "I was thinking.",
		username: "Axeljk"
	},
	{
		thoughtText: "foobar.",
		username: "foo"
	}
];

function getThoughts(user) {
	Thought.find({ username: user})
		.then(thoughts => thoughts.map(e => e._id))
}

const userSeed = [
	{
		username: "Axeljk",
		email: "axeljkern@yahoo.com"
	},
	{
		username: "foo",
		email: "foo@foo.foo"
	},
	{
		username: "bar",
		email: "bar@bar.bar"
	},
	{
		username: "baz",
		email: "baz@baz.baz"
	}
];

const seedDatabase = async () => {
	await Thought.deleteMany({});
	await Thought.insertMany(thoughtSeed);
	await User.deleteMany({});
	await User.insertMany(userSeed);

	// Garbage way to seed thoughts by _id.
	const brain = await getThoughts("Axeljk");
	await User.findOneAndUpdate(
		{ username: "Axeljk" },
		{ $addToSet: { thoughts: brain } })
};

seedDatabase()
	.then(() => {
		mongoose.connection.close();
		console.log("Seeding complete!");
		process.exit(0);
	});