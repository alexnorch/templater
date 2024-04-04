import Attribute, { IAttribute } from "../models/attributeModel";
import AttributeValue, { IAttributeValue } from "../models/attributeValueModel";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import { Types } from "mongoose";

type AttributeValuePreview = Pick<IAttributeValue, "value">;

class AttributeService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getAllAttributes() {
    return await Attribute.find({ user: this.userId }).populate("values");
  }

  async createAttribute(label: string, values: AttributeValuePreview[]) {
    const isAlreadyExists = await Attribute.findOne({
      label,
      user: this.userId,
    });

    if (isAlreadyExists) {
      throw new AppError("Attribute with this label is already exists", 400);
    }

    const user = (await User.findById(this.userId)) as IUser;

    const createdAttribute = await Attribute.create({
      user: this.userId,
      label,
    });

    const mappedValues = values.map((el) => ({
      ...el,
      attribute: createdAttribute._id,
    }));

    const valuesDocs = await AttributeValue.insertMany(mappedValues);
    const updatedAttribute = (await Attribute.findByIdAndUpdate(
      createdAttribute._id,
      { values: valuesDocs }
    )) as IAttribute;

    user.attributes.push(updatedAttribute._id);

    return updatedAttribute;
  }

  async updateAttribute(attributeId: string, body: any) {
    const { label, values } = body;

    if (!label || values.length === 0) {
      throw new AppError("Please provide all values", 400);
    }

    const updatedAttribute = await Attribute.findByIdAndUpdate(attributeId, {
      label,
    }).populate("values");

    if (!updatedAttribute) {
      throw new AppError("Attribute with that ID wasn't found", 400);
    }

    const removedElementsIds = updatedAttribute.values
      .filter(
        (element) =>
          !values.find(
            (item: any) => item._id.toString() === element._id.toString()
          )
      )
      .map((el) => el._id);

    if (removedElementsIds.length !== 0) {
      await AttributeValue.deleteMany({ _id: { $in: removedElementsIds } });
    }

    // Creating new attribute value of updating exising attributeValue
    for (const value of values) {
      if (value._id) {
        await AttributeValue.findByIdAndUpdate(value._id, value);
      } else {
        const newAttrValue = await AttributeValue.create({
          ...value,
          attribute: attributeId,
        });

        updatedAttribute.values.push(
          newAttrValue._id as Types.ObjectId & IAttributeValue
        );
      }
    }

    await updatedAttribute.save();

    return updatedAttribute;
  }

  async deleteAttribute(attrId: string) {
    const deletedAttribute = await Attribute.findOneAndDelete({
      _id: attrId,
      user: this.userId,
    });

    if (!deletedAttribute) {
      throw new AppError("Attribute with that ID wasn't found", 400);
    }

    await AttributeValue.deleteMany({ attribute: deletedAttribute._id });

    return deletedAttribute;
  }
}

export default AttributeService;
