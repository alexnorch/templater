import CategoriesList from "./CategoriesList";
import CategoryCreate from "./CategoryCreate";
import HeadingBlock from "../ui/HeadingBlock";
import "./Categories.scss";

const Categories = () => {
  return (
    <section className="categories">
      <div className="container">
        <div className="categories__header">
          <HeadingBlock title="My categories" heading="h2" position="left" />
          <CategoryCreate />
        </div>
        <CategoriesList />
      </div>
    </section>
  );
};

export default Categories;
