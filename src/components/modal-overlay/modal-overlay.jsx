import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
  const { onClick, children } = props;

  return (
    <div className={style.background} onClick={onClick}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
