import { Flex } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { handleCsRecordInputComponent } from "@components/inputForm/cs/handleCsRecordInputComponent";

export const handleCsRecordInputComponentRow = (form, codeRelationSet, selectedCodes, setSelectedCodes, components, index, index3) => {
  return (
    <Flex gap={16} key={`cs-record-input-component-row-${index3}`}>
      {components.map((component) => handleCsRecordInputComponent(form, codeRelationSet, selectedCodes, setSelectedCodes, component, index))}
    </Flex>
  );
}