const router = require("express").Router();
const {
  allUsers,
  userById,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/")
.get(allUsers)
.post(createUser);

// /api/users/:userId
router.route("/:userId")
.get(userById)
.put(updateUser)
.delete(removeUser);

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;