import { Flex } from "antd";
import CsRecordInputComponentInitial from "@components/inputForm/cs/CsRecordInputComponentInitial";

const CsRecordInputComponentRowInitial = ({ components, index }) => {
  return (
    <Flex gap={16}>
      {components.map((component, i) =>
        <CsRecordInputComponentInitial key={`cs-record-input-component-${i}`} component={component} index={index} />
      )}
    </Flex>
  );
}

export default CsRecordInputComponentRowInitial;