import React from "react";
import useModalEventStore from "@store/useModalEventStore";

const ModalTitle = ({ title }) => {
  const { setDisabled } = useModalEventStore();

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