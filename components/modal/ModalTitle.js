import React from "react";
import useRecordModalStore from "@store/useRecordModalStore";

const ModalTitle = ({ title }) => {
  const { setDisabled } = useRecordModalStore();

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