import { LiaTimesSolid } from "react-icons/lia";
import "./Modal.scss";

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <h3 className="modal__title">Create new category</h3>
          <button className="modal__close">
            <LiaTimesSolid />
          </button>
        </div>
        <div className="modal__content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
            excepturi? Autem doloribus nihil corrupti atque odio itaque amet
            ullam culpa?
          </p>
        </div>
        <div className="modal__bottom">
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
