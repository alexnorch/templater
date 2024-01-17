import mongoose, { Document, Types } from "mongoose";

export interface IAttribute extends Document {
  label: string;
  options: string[];
  templates: Types.ObjectId[];
}

const AttributeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Title is required"],
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    select: false,
  },
});

export default mongoose.model<IAttribute>("Attribute", AttributeSchema);
