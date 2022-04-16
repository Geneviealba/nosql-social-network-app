//**`/api/thoughts`**
const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts/get and post 
router.route("/")
.get(getThoughts)
.post(createThought);

// /api/applications/:applicationId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  //**`/api/thoughts/:thoughtId/reactions`**
router.route("/:thoughtId/reactions")
.post(addReaction);


router
.route("/:thoughtId/reactions/:reactionId")
.delete(removeReaction);

module.exports = router;