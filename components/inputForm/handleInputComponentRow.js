import { Flex } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";

export const handleInputComponentRow = (form, codeRelationSet, selectedCodes, setSelectedCodes, components) => {
  return (
    <Flex gap={16}>
      {components.map((component) => handleInputComponent(form, codeRelationSet, selectedCodes, setSelectedCodes, component))}
    </Flex>
  );
}