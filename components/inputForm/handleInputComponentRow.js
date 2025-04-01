import { Flex } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";

export const handleInputComponentRow = (form, codeRelationSet, components, index) => {
  return (
    <Flex gap={4} key={`input-component-row-${index}`}>
      {components.map((component, index) => handleInputComponent(form, codeRelationSet, component, index))}
    </Flex>
  );
}