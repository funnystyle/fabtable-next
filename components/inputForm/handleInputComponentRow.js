import { Flex } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";

export const handleInputComponentRow = (form, codeRelationSet, selectedCodes, setSelectedCodes, components, index) => {
  return (
    <Flex gap={16} key={`input-component-row-${index}`}>
      {components.map((component) => handleInputComponent(form, codeRelationSet, selectedCodes, setSelectedCodes, component))}
    </Flex>
  );
}