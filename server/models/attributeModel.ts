import mongoose, { Document, Types } from "mongoose";
import { IAttributeValue } from "./attributeValueModel";

export interface IAttribute extends Document {
  label: string;
  values: Types.ObjectId[] | IAttributeValue[];
  templates: Types.ObjectId[];
}

const AttributeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Title is required"],
  },
  values: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeValue",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    select: false,
  },
});

export default mongoose.model<IAttribute>("Attribute", AttributeSchema);
