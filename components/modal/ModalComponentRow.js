import { Flex } from "antd";
import ModalComponent from "@components/modal/ModalComponent";

const ModalComponentRow = ({form, codeRelationSet, selectedCodes, setSelectedCodes, components}) => {
  return (
    <Flex gap={8}>
      {components.map((component, i) =>
        <ModalComponent
          key={`modal-component-${i}`}
          form={form}
          codeRelationSet={codeRelationSet}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          component={component}
        />
      )}
    </Flex>
  );
}

export default ModalComponentRow;