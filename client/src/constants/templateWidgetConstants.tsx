import { NavLink } from "react-router-dom";
import { Paths } from "../pages/paths";

export const templatesWidgetData = [
  {
    question: "How to create a template?",
    answer: `To create your initial template, begin by establishing a category. Once the category has been created, you will be able to filter future templates based on the category title.`,
  },
  {
    question: "How to create a category?",
    answer: (
      <>
        In order to create a category, navigate to the
        <NavLink style={{ margin: "5px" }} to={Paths.settingsCategories}>
          <strong>Settings</strong>
        </NavLink>{" "}
        and select an appropriate title for your category.
      </>
    ),
  },
  {
    question: "What are attributes?",
    answer: (
      <>
        Attributes add extra details to templates, enabling easy filtering not
        just by categories, but also by other criteria like language. If you
        want to create or modify an attribute, go to the
        <NavLink style={{ margin: "5px" }} to={Paths.settingsCategories}>
          <strong>Settings</strong>
        </NavLink>{" "}
      </>
    ),
  },
];
