import "./CategoriesItem.scss";

interface ICategoriesItem {
  title: string;
  icon: string;
}

const CategoriesItem: React.FC<ICategoriesItem> = ({ icon, title }) => {
  return (
    <div className="category-item">
      <div className="category-item__icon">
        <img src={icon} alt="" />
      </div>
      <div className="category-item__bottom">
        <h3 className="category-item__title">{title}</h3>
      </div>
    </div>
  );
};

export default CategoriesItem;
