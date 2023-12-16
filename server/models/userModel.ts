import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  login: string;
  password: string;
  categories: mongoose.Types.ObjectId[];
  templates: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, "Login is required"],
    minLength: 8,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },

  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IUser>("User", UserSchema);
