import mongoose from "mongoose";

export interface IToken extends mongoose.Document {
  refreshToken: string;
  user: string;
}

const TemplateSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: [true, "Title is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<IToken>("Token", TemplateSchema);
