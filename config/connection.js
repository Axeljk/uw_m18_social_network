const { connect, connection } = require("mongoose");

const connectUri = process.env.MONGODB_URI || "mongodb://localhost/socialDB";

connect(connectUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports = connection;