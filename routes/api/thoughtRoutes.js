//**`/api/thoughts`**
const router = require("express").Router();
const {
  allThoughts,
  thoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts/get and post 
router.route("/")
.get(allThoughts)
.post(createThought);

// /api/applications/:applicationId
router
  .route("/:thoughtId")
  .get(thoughtById)
  .put(updateThought)
  .delete(removeThought);

  //**`/api/thoughts/:thoughtId/reactions`**
router.route("/:thoughtId/reactions")
.post(addReaction);


router
.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;