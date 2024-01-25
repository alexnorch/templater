import Attribute from "../models/attributeModel";
import AttributeValue from "../models/attributeValueModel";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";

class AttributeService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getAllAttributes() {
    return await Attribute.find({ user: this.userId }).populate("values");
  }

  async createAttribute(label: string) {
    const isAlreadyExists = await Attribute.findOne({
      label,
      user: this.userId,
    });

    if (isAlreadyExists) {
      return new AppError("Attribute with this label is already exists", 400);
    }

    const user = (await User.findById(this.userId)) as IUser;
    const attributeDoc = new Attribute({
      values: [],
      user: this.userId,
      label,
    });
    const createdAttribute = await attributeDoc.save();

    user.attributes.push(createdAttribute._id);

    return createdAttribute;
  }

  async updateAttribute(attrId: string, newLabel: string) {
    const updatedAttribute = await Attribute.findOneAndUpdate(
      { _id: attrId, user: this.userId },
      { $set: { label: newLabel } },
      { returnDocument: "after" }
    );

    if (!updatedAttribute) {
      return new AppError("Attribute with that ID wasn't found", 400);
    }

    return updatedAttribute;
  }
  async deleteAttribute(attrId: string) {
    const deletedAttribute = await Attribute.findOneAndDelete({
      _id: attrId,
      user: this.userId,
    });

    if (!deletedAttribute) {
      return new AppError("Attribute with that ID wasn't found", 400);
    }

    await AttributeValue.deleteMany({ attribute: deletedAttribute._id });

    return deletedAttribute;
  }

  async createAttributeValue(attrId: string, attrValue: string) {
    const attribute = await Attribute.findById(attrId);

    if (!attribute) {
      return new AppError("Invalid attribute ID", 400);
    }

    const isAlreadyExists = await AttributeValue.findOne({
      value: attrValue,
      attribute: attrId,
    });

    if (isAlreadyExists) {
      return new AppError("Option with this name is already exists", 400);
    }

    const attributeValueDoc = new AttributeValue({
      value: attrValue,
      attribute: attrId,
    });

    const createAttributeValue = await attributeValueDoc.save();

    attribute.values.push(createAttributeValue._id);
    attribute.save();

    return createAttributeValue;
  }

  async deleteAttributeValue(attrId: string, valueId: string) {
    const deletedAttributeOption = await AttributeValue.findOneAndDelete({
      attribute: attrId,
      _id: valueId,
    });

    if (!deletedAttributeOption) {
      return new AppError("Attribute Option with that ID wasn't found", 404);
    }

    return deletedAttributeOption;
  }
}

export default AttributeService;
