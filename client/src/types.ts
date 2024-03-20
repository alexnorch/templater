export interface ITemplateItem {
  _id: string;
  title: string;
  category: string | ICategoryItem;
  text: string;
  attributeValues: IAttributeOption[] | { [key: string]: string };
}

export interface IUser {
  _id: string;
  attributes: IAttribute[];
  categories: ICategoryItem[];
  templates: ITemplateItem[];
  createdAt: string;
  email: string;
}

export interface ICategoryItem {
  title: string;
  _id?: string | undefined;
}

export interface IAttribute {
  _id: string;
  label: string;
  values: IAttributeOption[];
}

export interface IAttributeOption {
  _id: string;
  value: string;
  attribute: IAttribute | string;
}
