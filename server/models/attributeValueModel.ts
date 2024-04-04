import { Document, Schema, Types, model } from "mongoose";

export interface IAttributeValue extends Document {
  _id: Types.ObjectId;
  label: string;
  value: string;
  attribute: Types.ObjectId;
}

const OptionSchema = new Schema({
  value: {
    type: String,
    required: [true, "Attribute value is required"],
  },
  attribute: {
    type: Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

export default model<IAttributeValue>("AttributeValue", OptionSchema);
