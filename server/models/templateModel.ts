import mongoose from "mongoose";
import { ICategory } from "./categoryModel";
import { IAttributeValue } from "./attributeValueModel";

export interface ITemplate extends mongoose.Document {
  title: string;
  category: ICategory;
  user: string;
  text: string;
  attributeValues: string[] | IAttributeValue[];
}

const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Category is required"],
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  attributeValues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeValue",
    },
  ],
});

export default mongoose.model<ITemplate>("Template", TemplateSchema);
