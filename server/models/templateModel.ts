import mongoose from "mongoose";

export interface ITemplate extends mongoose.Document {
  title: string;
  category: string;
  user: string;
  gender: string;
  language: string;
  text: string;
}

const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  language: {
    type: String,
    required: [true, "Language is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
});

export default mongoose.model<ITemplate>("Template", TemplateSchema);
