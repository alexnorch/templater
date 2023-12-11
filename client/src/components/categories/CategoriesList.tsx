import CategoriesItem from "./CategoriesItem";
import "./CategoriesList.scss";

const CategoriesList = () => {
  return (
    <div className="categories-list">
      <CategoriesItem
        title="Bonuses"
        icon="https://upload.wikimedia.org/wikipedia/commons/1/14/Dollar_Sign.svg"
      />
      <CategoriesItem
        title="KYC"
        icon="https://cdn-icons-png.flaticon.com/512/7355/7355471.png"
      />
      <CategoriesItem
        title="Withdraw "
        icon="https://cdn-icons-png.flaticon.com/512/6360/6360731.png"
      />
      <CategoriesItem
        title="Other"
        icon="https://cdn-icons-png.flaticon.com/512/152/152529.png"
      />
      <CategoriesItem
        title="Block account"
        icon="https://cdn-icons-png.flaticon.com/512/61/61457.png"
      />
      <CategoriesItem
        title="Limits"
        icon="https://cdn-icons-png.flaticon.com/512/7490/7490434.png"
      />
    </div>
  );
};

export default CategoriesList;
