const { Schema, model } = require("mongoose");

//create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Enter a valid e-mail address']
    //   validate: {
    //     validator: function (v) {
    //         return [/.+@.+\..+/].test(v);
    //     },
    //     message: props => `${props.value} is not a valid email address!`
    // },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount")
//Getter
.get(function () {
  return this.friends.length;
});


// Initialize our User model

const User = model("user", userSchema);

module.exports = User;