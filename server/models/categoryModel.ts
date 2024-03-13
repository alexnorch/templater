import mongoose, { Document, Types } from "mongoose";
import User from "./userModel";
import Template from "./templateModel";

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

CategorySchema.pre("findOneAndDelete", async function (next) {
  const { user, _id } = this.getFilter();

  const templatesToDelete = await Template.find({ category: _id });
  const templateIdsToDelete = templatesToDelete.map((template) => template._id);

  await Template.deleteMany({
    user,
    category: _id,
  });

  await User.findByIdAndUpdate(user, {
    $pull: { categories: _id, templates: { $in: templateIdsToDelete } },
  });

  next();
});

export default mongoose.model<ICategory>("Category", CategorySchema);
