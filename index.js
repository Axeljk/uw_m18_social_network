const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Catch-all for bad requests.
app.get("*", (req, res) => res.status(404).json({ message: "Lost? We can't find that." }));

db.once('open', () => {
	app.listen(PORT, () => console.log("API server running on port " + PORT));
});