import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  email: string;
  password: string | undefined;
  categories: mongoose.Types.ObjectId[];
  templates: mongoose.Types.ObjectId[];
  createdAt: Date;
  generateToken: (userId: string) => Promise<object>;
  comparePassword: (candidate: string, hashed: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const password = this.password || "";

  this.password = await bcrypt.hash(password, 10);
});

UserSchema.methods.comparePassword = async function (
  candidate: string,
  hashed: string
) {
  return bcrypt.compare(candidate, hashed);
};

UserSchema.methods.generateToken = function (userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });
};

export default mongoose.model<IUser>("User", UserSchema);
