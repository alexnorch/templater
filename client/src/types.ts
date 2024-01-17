export interface ITemplateItem {
  title: string;
  category: string;
  language: string;
  gender: string;
  text: string;
  _id?: string;
  attributes?: { [key: string]: string };
}

export interface ICategoryItem {
  title: string;
  _id?: string | undefined;
}

export interface IAttribute {
  _id: string;
  label: string;
  options: [] | IAttributeOption[];
}

export interface IAttributeOption {
  _id: string;
  name: string;
  attribute: string;
}
