import React from "react";
import ModalComponentRow from "@components/modal/ModalComponentRow";

const ModalTitle = ({title, setDisabled}) => {
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