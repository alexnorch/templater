export interface ITemplateItem {
  _id?: string;
  title: string;
  category: string;
  text: string;
  attributeValues: IAttributeValue[] | { [key: string]: string };
}

export interface ICategoryItem {
  title: string;
  _id?: string | undefined;
}

export interface IAttribute {
  _id: string;
  label: string;
  values: [] | IAttributeValue[];
}

export interface IAttributeValue {
  _id: string;
  value: string;
  attribute: string;
}
