import Attribute, { IAttribute } from "../models/attributeModel";
import AttributeValue, { IAttributeValue } from "../models/attributeValueModel";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import { Types } from "mongoose";

const arrayDifference = <T>(arr1: T[], arr2: T[]) => {
  const difference: T[] = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      difference.push(arr1[i]);
    }
  }

  return difference;
};

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

  async createAttributeValue(attrId: string, attrValue: string) {
    const attribute = await Attribute.findById(attrId);

    if (!attribute) {
      throw new AppError("Invalid attribute ID", 400);
    }

    const isAlreadyExists = await AttributeValue.findOne({
      value: attrValue,
      attribute: attrId,
    });

    if (isAlreadyExists) {
      throw new AppError("Option with this name is already exists", 400);
    }

    const createAttributeValue = await AttributeValue.create({
      value: attrValue,
      attribute: attrId,
    });

    // attribute.values.push(createAttributeValue._id);
    // attribute.save();

    return createAttributeValue;
  }

  async deleteAttributeValue(attrId: string, valueId: string) {
    const deletedAttributeOption = await AttributeValue.findOneAndDelete({
      attribute: attrId,
      _id: valueId,
    });

    if (!deletedAttributeOption) {
      throw new AppError("Attribute Option with that ID wasn't found", 404);
    }

    return deletedAttributeOption;
  }
}

export default AttributeService;
