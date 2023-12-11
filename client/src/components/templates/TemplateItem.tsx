import { FaCopy } from "react-icons/fa";
import "./TemplateItem.scss";

import EllipsisMenu from "../ui/EllipsisMenu";

const TemplateItem = () => {
  return (
    <div className="template-item">
      <div className="template-item__header">
        <h3 className="template-item__title">Withdraw under 500 EUR</h3>
        <EllipsisMenu>
          <button>Delete</button>
          <button>Edit</button>
        </EllipsisMenu>
      </div>
      <div className="template-item__body">
        <p className="template-item__text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam ipsa
          totam molestias, vitae cumque amet quam nam nulla earum. Laudantium,
          nobis dolores! Eveniet, beatae facere.
        </p>
        <button className="template-item__btn-copy">
          <FaCopy />
        </button>
      </div>
      <ul className="template-item__tags">
        <li className="template-item__tag">KYC</li>
        <li className="template-item__tag">KYC</li>
        <li className="template-item__tag">KYC</li>
      </ul>
    </div>
  );
};

export default TemplateItem;
