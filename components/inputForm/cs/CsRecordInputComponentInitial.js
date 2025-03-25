import { componentDisabled } from "@components/inputForm/componentDisabled";

const CsRecordInputComponentInitial = ({ component, index }) => {

  const recordColumn = component.recordColumn;

  return componentDisabled(recordColumn, index);
}

export default CsRecordInputComponentInitial;