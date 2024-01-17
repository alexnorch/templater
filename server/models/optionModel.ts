import mongoose, { Document } from "mongoose";

export interface IOption extends Document {
  name: string;
}

const OptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Option name is required"],
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

export default mongoose.model<IOption>("Option", OptionSchema);
