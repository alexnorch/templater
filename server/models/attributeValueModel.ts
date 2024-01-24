import mongoose, { Document } from "mongoose";

export interface IAttributeValue extends Document {
  name: string;
}

const OptionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Attribute value is required"],
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

export default mongoose.model<IAttributeValue>("AttributeValue", OptionSchema);
