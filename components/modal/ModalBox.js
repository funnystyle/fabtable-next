import React from "react";
import ModalComponentRow from "@components/modal/ModalComponentRow";

const ModalBox = ({form, codeRelationSet, selectedCodes, setSelectedCodes, item}) => {
  const componentsList = item[0].components;

  return (
    <>
      {componentsList.map((components, i) =>
        <ModalComponentRow
          key={`modal-component-row-${i}`}
          form={form}
          codeRelationSet={codeRelationSet}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          components={components}
        />
      )}
    </>
  );
}

export default ModalBox;