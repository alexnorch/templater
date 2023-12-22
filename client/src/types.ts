export interface ITemplateItem {
  title: string;
  category: any;
  language: string;
  gender: string;
  text: string;
  _id?: string;
}

export interface ICategoryItem {
  title: string;
  _id?: string | undefined;
}
