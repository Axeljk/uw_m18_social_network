const router = require("express").Router();
const {
	getThoughts,
	getThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction
} = require("../../controllers/thoughtController");

// [root]/api/thoughts:
router.route("/").get(getThoughts).post(createThought);

// [root]/api/thoughts/[_id]:
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

// [root]/api/thoughts/[_id]/reactions:
router.route("/:id/reactions/").post(addReaction);

// [root]/api/thoughts/[_id]/reactions/[_id]:
router.route("/:id/reactions/:reactionId").delete(removeReaction);

module.exports = router;