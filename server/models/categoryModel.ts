import mongoose, { Document, Types } from "mongoose";

export interface ICategory extends Document {
  title: string;
  user: Types.ObjectId;
  templates: Types.ObjectId[];
}

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    select: false,
  },
  templates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      select: false,
    },
  ],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
