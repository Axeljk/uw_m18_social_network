const router = require("express").Router();
const {
	getThoughts,
	getThought,
	createThought,
	updateThought,
	deleteThought
} = require("../../controllers/thoughtController");

// [root]/api/thoughts:
router.route("/").get(getThoughts).post(createThought);

// [root]/api/thoughts/[_id]:
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

module.exports = router;