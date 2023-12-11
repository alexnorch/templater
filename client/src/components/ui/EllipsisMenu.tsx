import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import "./EllipsisMenu.scss";

const EllipsisMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="ellipsis-menu">
      <button className="ellipsis-menu__btn">
        <IoEllipsisHorizontalSharp />
      </button>
      <div className="ellipsis-menu__options">{children}</div>
    </div>
  );
};

export default EllipsisMenu;
