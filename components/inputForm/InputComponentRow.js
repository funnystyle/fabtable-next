import { Flex } from "antd";
import InputComponent from "@components/inputForm/InputComponent";

const InputComponentRow = ({ form, codeRelationSet, components, index }) => {
  return (
    <Flex gap={4} key={`input-component-row-${index}`}>
      {components.map((component, index) =>
        <InputComponent
          key={`input-component-${index}`}
          form={form}
          codeRelationSet={codeRelationSet}
          component={component}
          index={index}
        />)}
    </Flex>
  );
}

export default InputComponentRow;