import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Untitled",
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
