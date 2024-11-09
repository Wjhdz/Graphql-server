import mongoose, { Mongoose } from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      ref: "person",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("User", User);
