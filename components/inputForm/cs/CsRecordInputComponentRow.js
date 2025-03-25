import { Flex } from "antd";
import CsRecordInputComponent from "@components/inputForm/cs/CsRecordInputComponent";

const CsRecordInputComponentRow = ({ form, codeRelationSet, components, index }) => {
  return (
    <Flex gap={16}>
      {components.map((component, i) =>
        <CsRecordInputComponent
          key={`cs-record-input-component-${i}`}
          form={form} codeRelationSet={codeRelationSet} component={component} index={index} />
      )}
    </Flex>
  );
}

export default CsRecordInputComponentRow;