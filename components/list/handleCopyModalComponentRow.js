import {Flex} from "antd";
import {handleCopyModalComponent} from "@components/list/handleCopyModalComponent";

export const handleCopyModalComponentRow = (form, components, index) => {
  return (
    <Flex gap={16} key={`component-row-${index}`}>
      {components.map((component, index) => handleCopyModalComponent(form, component, index))}
    </Flex>
  );
}