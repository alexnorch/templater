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
