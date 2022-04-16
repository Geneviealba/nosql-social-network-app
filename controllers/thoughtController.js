const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(400).json({ message: "No thoughts found with that id!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughtData: thoughtData._id } },
          { new: true }
        );
      })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: "Created Thought, but found no user associated with that ID",
            })
          : res.json("New thought Created" )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true,
        new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(400).json({ message: "No thought with this id!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought successfully deleted but no user with this id!",
            })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true,
         new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(404).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};