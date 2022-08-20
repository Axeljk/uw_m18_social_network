const router = require("express").Router();
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
} = require("../../controllers/userController");

// Stuff goes here.

// [root]/api/users:
router.route("/").get(getUsers).post(createUser);
//router.get("/", (req, res) => res.send("Placeholder; stuff should go here."));

// [root]/api/users/[_id]:
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;