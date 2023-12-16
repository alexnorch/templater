import mongoose, { Document, Types } from "mongoose";

export interface ICategory extends Document {
  title: string;
  color: string;
  user: Types.ObjectId;
  tasks: Types.ObjectId[];
}

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    select: false,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      select: false,
    },
  ],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
