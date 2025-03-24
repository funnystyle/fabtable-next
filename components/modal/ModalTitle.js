import React from "react";
import useModalStore from "@store/useModalStore";

const ModalTitle = ({ title }) => {
  const { setDisabled } = useModalStore();

  return (
    <div
      className="modal-title"
      onMouseOver={() => setDisabled(false)}
      onMouseOut={() => setDisabled(true)}
    >
      {title}
    </div>
  );
}

export default ModalTitle;