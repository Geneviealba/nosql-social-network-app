const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  allUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  userById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "There is No user associated with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "There is No User associated with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "There is No user associated with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and associated thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "There is No user associated with this id" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "There is no user associated with this id" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};