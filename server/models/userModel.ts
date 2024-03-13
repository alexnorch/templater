import mongoose from "mongoose";
import validator from "validator";

export interface IUser extends mongoose.Document {
  email: string;
  password: string | undefined;
  categories: mongoose.Types.ObjectId[];
  templates: mongoose.Types.ObjectId[];
  attributes: mongoose.Types.ObjectId[];
  createdAt: Date;
  templateAttributes: [{ [key: string]: string[] }];
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid e-mail adress"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
  attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attribute" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IUser>("User", UserSchema);
