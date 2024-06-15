import style from "./modal-overlay.module.css";
import React, { ReactNode, MouseEvent } from "react";

interface ModalOverlayProps {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const { onClick, children } = props;

  return (
    <div className={style.background} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
