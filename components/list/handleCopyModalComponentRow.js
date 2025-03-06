import {Flex} from "antd";
import {handleCopyModalComponent} from "@components/list/handleCopyModalComponent";

export const handleCopyModalComponentRow = (form, components) => {
  console.log("components", components);
  return (
    <Flex gap={16}>
      {components.map((component) => handleCopyModalComponent(form, component, components.length))}
    </Flex>
  );
}