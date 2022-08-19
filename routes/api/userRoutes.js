const router = require("express").Router();
const {
	getUsers
} = require("../../controllers/userController");

// Stuff goes here.

// [root]/api/users:
router.route("/").get(getUsers);
//router.get("/", (req, res) => res.send("Placeholder; stuff should go here."));

module.exports = router;