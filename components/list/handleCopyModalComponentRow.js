import {Row} from "antd";
import {handleCopyModalComponent} from "@components/list/handleCopyModalComponent";

export const handleCopyModalComponentRow = (form, components) => {
  console.log("components", components);
  return (
    <Row gutter={16} key={`row-${components[0].id}`}>
      {components.map((component) => handleCopyModalComponent(form, component, components.length))}
    </Row>
  );
}